import { mimicVar } from '.';

export interface UiLayer {
  tag: string;
  id: string;
}

export class UiLayerManager {
  private uiLayers: Ref<UiLayer[]> = ref([]);

  /** 根据实际情况更新图层信息 */
  update() {
    const { subUis } = mimicVar.displayEditor.getTreeUis();
    console.log('@@@@ subUis', subUis.length);
    this.uiLayers.value = subUis.map(e => ({ tag: e.tag, id: e.id! }));
  }

  getUiLayers() {
    return this.uiLayers;
  }
}
