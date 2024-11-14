import * as _ from 'lodash-es';
import { mimicVar } from '@mimic/global';
import { displayBaseMapId } from '@mimic/constant';
import { UICreator, type IUI, type UI } from 'leafer-ui';
import { type Ref } from 'vue';
import { useMimicDisplayStatus } from '../stores';

/** 页面自适应 */
export function viewAutoFit() {
  if (mimicVar.displayEditor.app) {
    mimicVar.displayEditor.app.tree.zoom('fit', 23);
  }
}

/** 根据元素 id 查询 UI 对象 */
export function findUiById(id?: null | string | string[]) {
  if (_.isNil(id)) return null;
  if (_.isArray(id)) {
    // 遍历
    return id.map(id => mimicVar.displayEditor.app!.tree.findId(id)) as IUI[];
  }
  return mimicVar.displayEditor.app?.tree.findId(id);
}

/** 获取当前选中的元素 */
export function findCurrentSelected() {
  const mimicDisplayStatus = useMimicDisplayStatus();
  return findUiById(mimicDisplayStatus.selectedUiId);
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

/** 根据 tag 获取Ui类用于创建元素 */
export function getUiClassByTag(tag: string) {
  return UICreator.list[tag];
}

/** 将自定义 UI 对象的 config 转换为 json */
export function customUiClassToJson(cfg: any) {
  return JSON.stringify(cfg, (key, value) => {
    if (typeof value === 'function') {
      return value.toString();
    }
    return value;
  });
}

export function jsonToCustomUiClass(json: any): any {
  return JSON.parse(json, (key, value) => {
    if (typeof value === 'string' && value.startsWith('function')) {
      return eval(`(${value})`);
    }
    return value;
  });
}
