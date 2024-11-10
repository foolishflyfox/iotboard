import { mimicFileApi } from '@/service/api';
import { getUiClassByTag } from '@mimic/utils';

export async function registerComponent(tag: string) {
  let uiClass = getUiClassByTag(tag);
  if (!uiClass) {
    const componentJson = await mimicFileApi.getComponentJson(tag);
    console.log('组件 json:', componentJson);
    uiClass = getUiClassByTag(tag);
  }
  return uiClass;
}
