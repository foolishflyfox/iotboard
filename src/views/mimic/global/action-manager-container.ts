import { useMimicWorkspaceStatus } from '@mimic/stores';
import { ActionManager } from './action-manager';
import type { ShallowRef } from 'vue';

/** display 和 module 使用不同的 container 实例 */
export class ActionManagerContainer {
  private actionManagerMap: Map<string, ActionManager>;
  private mimicWorkspaceStatus?: ReturnType<typeof useMimicWorkspaceStatus>;
  private currentActionManager: ShallowRef<ActionManager | undefined>;
  private currentUndoEnable: ComputedRef<boolean>;
  private currentRedoEnable: ComputedRef<boolean>;

  constructor() {
    this.actionManagerMap = new Map();
    this.currentActionManager = shallowRef();
    this.currentUndoEnable = computed(() => {
      return Boolean(this.currentActionManager.value?.getUndoEnable().value);
    });
    this.currentRedoEnable = computed(() => {
      return Boolean(this.currentActionManager.value?.getRedoEnable().value);
    });
  }

  private getMimicWorkspaceStatus() {
    if (!this.mimicWorkspaceStatus) {
      this.mimicWorkspaceStatus = useMimicWorkspaceStatus();
    }
    return this.mimicWorkspaceStatus;
  }

  addActionManager(target: string, manager?: ActionManager) {
    if (manager) {
      this.actionManagerMap.set(target, manager);
    } else {
      this.actionManagerMap.set(target, new ActionManager());
    }
  }

  removeActionManager(target?: string) {
    if (target) {
      this.actionManagerMap.delete(target);
    } else {
      const mimicWorkspaceStatus = this.getMimicWorkspaceStatus();
      if (mimicWorkspaceStatus.currentTarget?.path) {
        this.removeActionManager(mimicWorkspaceStatus.currentTarget.path);
      }
    }
  }

  getActionManager(target?: string) {
    if (target) {
      return this.actionManagerMap.get(target);
    } else {
      const mimicWorkspaceStatus = this.getMimicWorkspaceStatus();
      if (mimicWorkspaceStatus.currentTarget?.path) {
        return this.getActionManager(mimicWorkspaceStatus.currentTarget.path);
      }
    }
  }

  getCurrentUndoEnable() {
    return this.currentUndoEnable;
  }

  getCurrentRedoEnable() {
    return this.currentRedoEnable;
  }
}
