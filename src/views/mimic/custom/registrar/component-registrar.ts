import { getUiClassByTag } from '@mimic/utils';

export function registerComponent(tag: string) {
  let uiClass = getUiClassByTag(tag);
  if (!uiClass) {
    console.log('注册组件', tag);
    uiClass = getUiClassByTag(tag);
  }
  return uiClass;
}
