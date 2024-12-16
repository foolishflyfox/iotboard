import type { UiCustomCfg } from './custom-ui';
import {
  Box,
  BoxData,
  dataProcessor,
  registerUI,
  type IBoxData,
  type IBoxInputData,
} from 'leafer-ui';
import { autoId } from '../../decorates';
import * as _ from 'lodash-es';
import '@leafer-in/state';
import '@leafer-in/animate';

export function customButtonGenerate(customCfg: UiCustomCfg) {
  interface CustomData {}
  interface ICustomButtonInputData extends IBoxInputData, CustomData {}

  interface ICustomButtonData extends IBoxData, CustomData {}

  class InnerData extends BoxData implements ICustomButtonData {}

  @registerUI()
  @autoId()
  class InnerCustom extends Box {
    static appearanceTypes = customCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return customCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: any;

    constructor(data: ICustomButtonInputData) {
      super({
        fill: '#409EFF',
        cornerRadius: 5,
        origin: 'center',
        button: true,
        hoverStyle: {
          fill: '#FF4B4B',
        },
        pressStyle: {
          fill: '#FEB027'
        },
        children: [{
          tag: 'Text',
          text: 'Button',
          fontSize: 16,
          fontWeight: 'bold',
          padding: [5, 20],
          fill: '#FFFFFFFF',
          hoverStyle: { fill: 'black' }, // 鼠标 hover 到 button 上的状态
          pressStyle: { fill: 'gray' }
        }],
        ...data
      });
    }
  }
}
