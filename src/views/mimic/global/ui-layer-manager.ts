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

  /** 将选中的 ui 向上移动 */
  upward(id: string) {
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

  /** 将选中的 ui 移到顶层 */
  toTop(id: string) {
    const index = this.findIndexById(id);
    if (index === -1 || index === this.uiLayers.value.length - 1) return;
    const curUi = mimicVar.displayEditor.app?.tree.findId(id);
    const topUiId = this.uiLayers.value[this.uiLayers.value.length - 1].id;
    const topUi = mimicVar.displayEditor.app?.tree.findId(topUiId);
    if (!curUi || !topUi) return;
    curUi.remove();
    mimicVar.displayEditor.app!.tree.addAfter(curUi, topUi);
    this.update();
    lazyGetMimicWorkspaceStatus().setCurrentDisplayUnsave();
  }

  /** 将选中的 ui 向下移动 */
  downward(id: string) {
    const index = this.findIndexById(id);
    if (index === -1 || index === 0) return;
    const preUiId = this.uiLayers.value[index - 1].id;
    const curUi = mimicVar.displayEditor.app?.tree.findId(id);
    const preUi = mimicVar.displayEditor.app?.tree.findId(preUiId);
    if (!curUi || !preUi) return;
    curUi.remove();
    mimicVar.displayEditor.app!.tree.addBefore(curUi, preUi);
    this.update();
    lazyGetMimicWorkspaceStatus().setCurrentDisplayUnsave();
  }

  /** 将选中的 ui 移到底部 */
  toBottom(id: string) {
    const index = this.findIndexById(id);
    if (index === -1 || index === 0) return;
    const curUi = mimicVar.displayEditor.app?.tree.findId(id);
    const bottomUiId = this.uiLayers.value[0].id;
    const bottomUi = mimicVar.displayEditor.app?.tree.findId(bottomUiId);
    if (!curUi || !bottomUi) return;
    curUi.remove();
    mimicVar.displayEditor.app!.tree.addBefore(curUi, bottomUi);
    this.update();
    lazyGetMimicWorkspaceStatus().setCurrentDisplayUnsave();
  }
}
