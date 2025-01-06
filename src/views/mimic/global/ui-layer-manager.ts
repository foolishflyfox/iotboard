import { mimicVar } from '.';

export interface UiLayer {
  tag: string;
  id: string;
  zIndex?: number;
}

export class UiLayerManager {
  private uiLayers: Ref<UiLayer[]> = ref([]);

  /** 根据实际情况更新图层信息 */
  update() {
    const { subUis } = mimicVar.displayEditor.getTreeUis();
    this.uiLayers.value = subUis.map(e => ({ tag: e.tag, id: e.id!, zindex: e.zIndex }));
  }

  getUiLayers() {
    return this.uiLayers;
  }
}
