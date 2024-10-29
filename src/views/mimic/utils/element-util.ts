import * as _ from 'lodash-es';
import { mimicVar } from '@mimic/global';
import { displayBaseMapId } from '@mimic/constant';
import type { IUI, UI } from 'leafer-ui';
import { type Ref } from 'vue';
import { useMimicWorkspaceStatus } from '../stores';

/** 页面自适应 */
export function viewAutoFit() {
  if (mimicVar.app) {
    mimicVar.app.tree.zoom('fit', 23);
  }
}

/** 根据元素 id 查询 UI 对象 */
export function findUiById(id?: null | string | string[]) {
  if (_.isNil(id)) return null;
  if (_.isArray(id)) {
    // 遍历
    return id.map(id => mimicVar.app!.tree.findId(id)) as IUI[];
  }
  return mimicVar.app?.tree.findId(id);
}

/** 获取当前选中的元素 */
export function findCurrentSelected() {
  const mimicWorkspaceStatus = useMimicWorkspaceStatus();
  return findUiById(mimicWorkspaceStatus.selectedUiId);
}

/** 获取图纸的底图元素 */
export function getDisplayBaseMap() {
  return findUiById(displayBaseMapId) as UI;
}

/** 更新 proxyData 中的 data 对象的字段，并产生响应式 */
export function updateElementData(
  proxyData: Ref<{ data?: any } | undefined>,
  fieldName: string,
  value: any,
) {
  if (proxyData && proxyData.value) {
    proxyData.value.data = { ...proxyData.value.data, [fieldName]: value };
  }
}
