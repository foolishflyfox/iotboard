import { ActionManager } from './action-manager';
import type { ShallowRef } from 'vue';
import { BaseContainer } from './base-container';

/** display 和 module 使用不同的 container 实例 */
export class ActionManagerContainer extends BaseContainer<ActionManager> {
  private currentActionManager: ShallowRef<ActionManager | undefined>;
  private currentUndoEnable: ComputedRef<boolean>;
  private currentRedoEnable: ComputedRef<boolean>;

  constructor() {
    super(ActionManager);
    this.currentActionManager = shallowRef();
    this.currentUndoEnable = computed(() => {
      return Boolean(this.currentActionManager.value?.getUndoEnable().value);
    });
    this.currentRedoEnable = computed(() => {
      return Boolean(this.currentActionManager.value?.getRedoEnable().value);
    });
  }

  switchActionManager(target: string, manager?: ActionManager) {
    if (!this.managerMap.has(target)) {
      if (manager) {
        this.managerMap.set(target, manager);
      } else {
        this.managerMap.set(target, new ActionManager());
      }
    }
    this.currentActionManager.value = this.managerMap.get(target);
  }

  getCurrentUndoEnable() {
    return this.currentUndoEnable;
  }

  getCurrentRedoEnable() {
    return this.currentRedoEnable;
  }
}
