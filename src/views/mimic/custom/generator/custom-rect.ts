import { dataProcessor, Rect, RectData, registerUI } from 'leafer-editor';
import { autoId } from '@mimic/decorates';
import type { UiCustomCfg } from './custom-ui';

export function customRectGenerate(rectCustomCfg: UiCustomCfg) {
  class InnerData extends RectData {}

  @registerUI()
  @autoId()
  class InnerCustom extends Rect {
    static appearanceTypes = rectCustomCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return rectCustomCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: any;

    constructor(data: any) {
      data = {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        stroke: {
          type: 'solid',
          color: '#000000',
        },
        fill: '#00BFFF00',
        strokeWidth: 5,
        cornerRadius: 8,
        ...data,
      };
      super(data);
    }
  }
}
