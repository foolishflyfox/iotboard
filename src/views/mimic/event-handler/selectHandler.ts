import type { EditorEvent, IUI } from 'leafer-editor';
import * as _ from 'lodash-es';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import type { ShallowRef } from 'vue';
import { displayName } from '@mimic/constant';

let selectedUI: ShallowRef<null | IUI | IUI[]>;

export function selectHandler(event: EditorEvent) {
  if (_.isNil(selectedUI)) {
    selectedUI = toRefs(useMimicWorkspaceStatus()).selectedUI;
  }
  console.log(event);
  const ui = event.value;
  if (ui === null) {
    // 没有选中任何UI元素
    // selectedUI.value = null;
    console.log('@@@', event.editor.app.tree);
    selectedUI.value =
      event.editor.app.tree?.findOne(`.${displayName}`) || null;
  } else if (_.isArray(ui)) {
    if (_.isEmpty(ui)) {
      // 没有选中任何UI元素
      selectedUI.value =
        event.editor.app.tree?.findOne(`.${displayName}`) || null;
    } else {
      // 选中的是多个UI元素
      selectedUI.value = ui;
    }
  } else {
    // 选中的是单个UI元素
    selectedUI.value = ui;
  }
}
