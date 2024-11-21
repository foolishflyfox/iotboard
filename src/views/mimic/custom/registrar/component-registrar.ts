import { mimicFileApi } from '@/service/api';
import { deleteUiClassByTag, getUiClassByTag, jsonToCustomUiClass } from '@mimic/utils';
import * as _ from 'lodash-es';
import { customUiGenerate, customCfgDict, type UiCustomCfg } from '@mimic/custom/generator';
import { UICreator, type UI } from 'leafer-ui';
import { mimicVar } from '@mimic/global';

export async function registerUiClass(tag: string) {
  let componentJson: string | null = mimicVar.componentJsonStrDict[tag];
  let uiClass: typeof UI = getUiClassByTag(tag);
  if (!componentJson || !uiClass) {
    componentJson = await mimicFileApi.getComponentJsonString(tag);
    if (componentJson) {
      mimicVar.componentJsonStrDict[tag] = componentJson;
      const newCfg: UiCustomCfg = jsonToCustomUiClass(componentJson);
      customUiGenerate(newCfg);
      uiClass = getUiClassByTag(tag);
      if (uiClass) {
        customCfgDict.ui[tag] = newCfg;
      }
    }
  }
  return uiClass;
}

export function registerTestUiClass(componentTag: string, jsonStr: string) {
  if (_.isEmpty(componentTag) || _.isEmpty(jsonStr)) return null;
  const testTag = `test:${componentTag}`;
  deleteUiClassByTag(testTag);
  const cfg: UiCustomCfg = jsonToCustomUiClass(jsonStr);
  cfg.tag = testTag;
  customUiGenerate(cfg);
  const uiClass: typeof UI = getUiClassByTag(testTag);
  return uiClass;
}
