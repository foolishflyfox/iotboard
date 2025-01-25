import { Group, GroupData, registerUI, type IGroupData, type IGroupInputData } from 'leafer-editor';
import { autoId } from '@mimic/decorates';
import { getCommonAppearanceTypes } from '@mimic/types';
import type { UiCustomCfg } from './custom-ui';

export function customModuleGenerate(customCfg: UiCustomCfg) {
  interface CustomData {}
  interface ICustomModuleInputData extends IGroupInputData, CustomData { }
  interface ICustomModuleData extends IGroupData, CustomData { }
  class InnerData extends GroupData implements ICustomModuleData {}
  @registerUI()
  @autoId()
  class InnerCustom extends Group {

  }
}
