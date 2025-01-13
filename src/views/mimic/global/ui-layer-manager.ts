import { mimicVar } from '.';
import { lazyGetMimicWorkspaceStatus } from '@mimic/stores';

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

  /** 获取当前所有的图层信息 */
  getUiLayers() {
    return this.uiLayers;
  }

  private findIndexById(id: string) {
    return this.uiLayers.value.findIndex(e => e.id === id);
  }

  /** 将指定的 ui 向上移动 */
  upper(id: string) {
    const index = this.findIndexById(id);
    if (index === -1 || index === this.uiLayers.value.length - 1) return;
    const nextUiId = this.uiLayers.value[index + 1].id;
    const curUi = mimicVar.displayEditor.app?.tree.findId(id);
    const nextUi = mimicVar.displayEditor.app?.tree.findId(nextUiId);
    if (!curUi || !nextUi) return;
    curUi.remove();
    mimicVar.displayEditor.app!.tree.addAfter(curUi, nextUi);
    this.update();
    lazyGetMimicWorkspaceStatus().setCurrentDisplayUnsave();
  }
}
