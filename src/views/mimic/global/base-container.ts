import { useMimicWorkspaceStatus } from '@mimic/stores';
import type { OpenedTarget } from '../types';

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

  protected generateKey(target: OpenedTarget) {
    return `${target.editorType}:${target.path}`;
  }

  addManager(target: OpenedTarget, manager?: T) {
    if (manager) {
      this.managerMap.set(this.generateKey(target), manager);
    } else {
      this.managerMap.set(this.generateKey(target), new this.cls());
    }
  }

  removeManager(target?: OpenedTarget) {
    if (target?.path) {
      this.managerMap.delete(this.generateKey(target));
    } else {
      const mimicWorkspaceStatus = this.getMimicWorkspaceStatus();
      if (mimicWorkspaceStatus.currentTarget?.path) {
        this.removeManager(mimicWorkspaceStatus.currentTarget);
      }
    }
  }

  getManager(target?: OpenedTarget): T | undefined {
    if (target?.path) {
      return this.managerMap.get(this.generateKey(target));
    } else {
      const mimicWorkspaceStatus = this.getMimicWorkspaceStatus();
      if (mimicWorkspaceStatus.currentTarget?.path) {
        return this.getManager(mimicWorkspaceStatus.currentTarget);
      }
    }
  }
}
