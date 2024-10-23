import type { EditorEvent, IUI } from 'leafer-editor';
import * as _ from 'lodash-es';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import type { ShallowRef } from 'vue';

let selectedUI: ShallowRef<null | IUI | IUI[]>;

export function selectHandler(event: EditorEvent) {
  if (_.isNil(selectedUI)) {
    selectedUI = toRefs(useMimicWorkspaceStatus()).selectedUI;
  }
  const ui = event.value;
  if (ui === null) {
    // 没有选中任何UI元素
    selectedUI.value = null;
  } else if (_.isArray(ui)) {
    // 选中的是多个UI元素
    selectedUI.value = ui;
  } else {
    // 选中的是单个UI元素
    selectedUI.value = ui;
  }
}
