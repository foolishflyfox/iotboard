import { dataProcessor, Rect, RectData, registerUI } from 'leafer-ui';
import { autoId } from '../../decorates';
import type { BaseCustomCfg } from '@mimic/types';

export interface RectCustomCfg extends BaseCustomCfg {}

export function customRectGenerate(rectCustomCfg: RectCustomCfg) {
  class InnerData extends RectData {}

  @registerUI()
  @autoId()
  class InnerCustom extends Rect {
    static appearanceTypes = rectCustomCfg.includeAppearances || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return rectCustomCfg.tag;
    }

    @dataProcessor(InnerData)
    public declare __: any;

    constructor(data: any) {
      data = {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        stroke: '#000000',
        strokeWidth: 5,
        cornerRadius: 8,
        ...data,
      };
      super(data);
    }
  }
}
