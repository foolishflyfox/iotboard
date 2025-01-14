import { displayBaseMapId } from '@mimic/constant';
import { mimicVar } from '@mimic/global';
import type { UI } from 'leafer-editor';
import * as _ from 'lodash-es';

/** 图纸编辑器相关状态 */
export const useMimicDisplayStatus = defineStore('mimic-display-status', () => {
  // 当前选中的 UI
  const selectedUiId = ref<null | undefined | string | string[]>();
  const selectBaseMap = () => (selectedUiId.value = displayBaseMapId);
  const curUi = computed(() => mimicVar.displayEditor.findUiById(selectedUiId.value));
  // 右键菜单是否禁用
  const contextMenuItemDisabled = computed(() => {
    const result = {
      copy: true,
      paste: true,
      clone: true,
      delete: true,
      lock: true,
      png: true,
      jpg: true,
      top: true,
      bottom: true,
      up: true,
      down: true,
      group: true,
      ungroup: true,
      copyStyle: true,
      pasteStyle: true
    };
    if (_.isArray(selectedUiId.value)) {
      // 选中多个目标
      result.copy = false;
      result.clone = false;
      result.delete = false;
      result.group = false;
    } else if (selectedUiId.value === displayBaseMapId) {
      // 什么都没选中
      result.paste = false;
    } else if (!_.isEmpty(selectedUiId.value)) {
      // 选中一个目标
      result.copy = false;
      result.clone = false;
      result.delete = false;
      result.lock = false;
      result.png = false;
      result.jpg = false;
      result.top = false;
      result.bottom = false;
      result.up = false;
      result.down = false;
      result.copyStyle = false;
      result.pasteStyle = false;
      console.log('@@@###', (curUi.value as UI).tag);
      if ((curUi.value as UI).tag === 'Group') {
        result.ungroup = false;
      }
    }
    return result;
  });
  return {
    selectedUiId,
    selectBaseMap,
    contextMenuItemDisabled,
    curUi,
  };
});
