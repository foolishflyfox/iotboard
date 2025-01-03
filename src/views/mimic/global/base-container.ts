import { useMimicWorkspaceStatus } from '@mimic/stores';

export abstract class BaseContainer<T> {
  protected managerMap: Map<string, T>;
  protected mimicWorkspaceStatus?: ReturnType<typeof useMimicWorkspaceStatus>;

  constructor(protected cls: { new (...args: any[]): T }) {
    this.managerMap = new Map();
  }

  protected getMimicWorkspaceStatus() {
    if (!this.mimicWorkspaceStatus) {
      this.mimicWorkspaceStatus = useMimicWorkspaceStatus();
    }
    return this.mimicWorkspaceStatus;
  }

  addManager(targetPath: string, manager?: T) {
    if (manager) {
      this.managerMap.set(targetPath, manager);
    } else {
      this.managerMap.set(targetPath, new this.cls());
    }
  }

  removeManager(targetPath?: string) {
    if (targetPath) {
      this.managerMap.delete(targetPath);
    } else {
      const mimicWorkspaceStatus = this.getMimicWorkspaceStatus();
      if (mimicWorkspaceStatus.currentTarget?.path) {
        this.removeManager(mimicWorkspaceStatus.currentTarget.path);
      }
    }
  }

  getManager(targetPath?: string): T | undefined {
    if (targetPath) {
      return this.managerMap.get(targetPath);
    } else {
      const mimicWorkspaceStatus = this.getMimicWorkspaceStatus();
      if (mimicWorkspaceStatus.currentTarget?.path) {
        return this.getManager(mimicWorkspaceStatus.currentTarget.path);
      }
    }
  }
}
