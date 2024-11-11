import { mimicFileApi } from '@/service/api';
import { getUiClassByTag, jsonToCustomUiClass } from '@mimic/utils';
import * as _ from 'lodash-es';
import { customUiGenerate, customCfgDict, type UiCustomCfg } from '@mimic/custom/generator';

export async function registerComponent(tag: string) {
  let uiClass = getUiClassByTag(tag);
  if (!uiClass) {
    const componentJson = await mimicFileApi.getComponentJson(tag);
    const json = JSON.stringify(componentJson);
    // const curCfg = _.cloneDeep(cfg);
    // curCfg.tag = tag;
    // const json = customUiClassToJson(curCfg);
    const newCfg: UiCustomCfg = jsonToCustomUiClass(json);
    customUiGenerate(newCfg);
    uiClass = getUiClassByTag(tag);
    if (uiClass) {
      customCfgDict.ui[tag] = newCfg;
    }
  }
  return uiClass;
}
