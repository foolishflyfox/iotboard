import type { ShallowRef } from 'vue';
import { BaseContainer } from './base-container';
import { UiLayerManager, type UiLayer } from './ui-layer-manager';

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

  switchUiLayerManager(target: string, manager?: UiLayerManager) {
    if (!this.managerMap.has(target)) {
      this.addManager(target, manager);
    }
    this.currentUiLayerManager.value = this.managerMap.get(target);
  }

  getCurrentUiLayers() {
    return this.currentUiLayers;
  }
}
