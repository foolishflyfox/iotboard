import { useMimicWorkspaceStatus } from '@mimic/stores';
import type { BaselineManager } from './baseline-manager';

export class BaselineManagerContainer {
  private baselineManagerMap: Map<string, BaselineManager>;
  private mimicWorkspaceStatus?: ReturnType<typeof useMimicWorkspaceStatus>;

  constructor() {
    this.baselineManagerMap = new Map();
  }

  private getMimicWorkspaceStatus() {
    if (!this.mimicWorkspaceStatus) {
      this.mimicWorkspaceStatus = useMimicWorkspaceStatus();
    }
    return this.mimicWorkspaceStatus;
  }

  addBaselineManager(displayPath: string, baselineManager: BaselineManager) {
    this.baselineManagerMap.set(displayPath, baselineManager);
  }

  removeBaselineManager(displayPath?: string) {
    if (displayPath) {
      this.baselineManagerMap.delete(displayPath);
    } else {
      const mimicWorkspaceStatus = this.getMimicWorkspaceStatus();
      if (mimicWorkspaceStatus.currentTarget?.path) {
        this.removeBaselineManager(mimicWorkspaceStatus.currentTarget.path);
      }
    }
  }

  getBaselineManager(displayPath?: string): BaselineManager | undefined {
    if (displayPath) {
      return this.baselineManagerMap.get(displayPath);
    } else {
      const mimicWorkspaceStatus = this.getMimicWorkspaceStatus();
      if (mimicWorkspaceStatus.currentTarget?.path) {
        return this.getBaselineManager(mimicWorkspaceStatus.currentTarget.path);
      }
    }
  }
}
