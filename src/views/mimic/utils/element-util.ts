import * as _ from 'lodash-es';
import { UICreator } from 'leafer-ui';
import { type Ref } from 'vue';

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
