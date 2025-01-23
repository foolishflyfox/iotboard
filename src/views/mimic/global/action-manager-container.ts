import { ActionManager } from './action-manager';
import type { ShallowRef } from 'vue';
import { BaseContainer } from './base-container';
import type { OpenedTarget } from '../types';

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

  switchActionManager(target: OpenedTarget, manager?: ActionManager) {
    if (!this.getManager(target)) {
      this.addManager(target, manager);
    }
    this.currentActionManager.value = this.getManager(target);
  }

  getCurrentUndoEnable() {
    return this.currentUndoEnable;
  }

  getCurrentRedoEnable() {
    return this.currentRedoEnable;
  }
}
