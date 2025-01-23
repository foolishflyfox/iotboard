import type { ShallowRef } from 'vue';
import { BaseContainer } from './base-container';
import { UiLayerManager, type UiLayer } from './ui-layer-manager';
import type { OpenedTarget } from '../types';

export class UiLayerManagerContainer extends BaseContainer<UiLayerManager> {
  private currentUiLayerManager: ShallowRef<UiLayerManager | undefined>;
  private currentUiLayers: ComputedRef<UiLayer[]>;
  constructor() {
    super(UiLayerManager);
    this.currentUiLayerManager = shallowRef();
    this.currentUiLayers = computed(() => {
      return this.currentUiLayerManager.value?.getUiLayers().value || [];
    });
  }

  switchUiLayerManager(target: OpenedTarget, manager?: UiLayerManager) {
    if (!this.getManager(target)) {
      this.addManager(target, manager);
    }
    this.currentUiLayerManager.value = this.getManager(target);
  }

  getCurrentUiLayers() {
    return this.currentUiLayers;
  }

  upward(uiId: string) {
    this.currentUiLayerManager.value?.upward(uiId);
  }

  toTop(uiId: string) {
    this.currentUiLayerManager.value?.toTop(uiId);
  }

  downward(uiId: string) {
    this.currentUiLayerManager.value?.downward(uiId);
  }

  toBottom(uiId: string) {
    this.currentUiLayerManager.value?.toBottom(uiId);
  }
}
