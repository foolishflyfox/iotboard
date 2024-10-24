import type { EditorEvent, IUI } from 'leafer-editor';
import * as _ from 'lodash-es';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import type { ShallowRef } from 'vue';
import { displayName } from '@mimic/constant';

// let selectedUI: ShallowRef<null | IUI | IUI[]>;

// todo: 修改直接将 ui 挂载到 pinia 下，而是将 id 挂载到 pinia 下
export function selectHandler(event: EditorEvent) {
  // if (_.isNil(selectedUI)) {
  //   selectedUI = toRefs(useMimicWorkspaceStatus()).selectedUI;
  // }
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  console.log(event);
  const ui = event.value;
  if (ui === null) {
    // 没有选中任何UI元素
    // selectedUI.value = null;
    console.log('@@@', event.editor.app.tree);
    // selectedUI.value =
    mimicWorkspaceStatus.selectedUI =
      event.editor.app.tree?.findOne(`.${displayName}`) || null;
  } else if (_.isArray(ui)) {
    if (_.isEmpty(ui)) {
      // 没有选中任何UI元素
      // selectedUI.value =
      mimicWorkspaceStatus.selectedUI =
        event.editor.app.tree?.findOne(`.${displayName}`) || null;
    } else {
      // 选中的是多个UI元素
      // selectedUI.value = ui;
      mimicWorkspaceStatus.selectedUI = ui;
    }
  } else {
    // 选中的是单个UI元素
    // todo: 如果绑定的是 ui，会造成卡顿
    // 参考: https://www.leaferjs.com/ui/guide/problem/
    // 检查是否有将 leafer 或元素实例绑定了到前端框架的响应式数据，会造成大量的数据代理、覆盖方法，并拖慢布局速度。
    // selectedUI.value = ui;
    // selectedUI.value = null;
    mimicWorkspaceStatus.selectedUI = ui;
  }
}
