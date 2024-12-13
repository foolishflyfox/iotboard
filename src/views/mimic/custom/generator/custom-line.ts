import type { BaseCustomCfg } from '@mimic/types';
import { dataProcessor, Line, LineData, registerUI } from 'leafer-ui';
import { autoId } from '@mimic/decorates';

export interface LineCustomCfg extends BaseCustomCfg {}

export function customLineGenerate(lineCustomCfg: LineCustomCfg) {
  interface CustomData {
    /** 线条在虚线模式下的，0 表示无流动
     * 正数和负数表示不同的流动方向
     * 值表示流动速度，绝对值越大，流动速度越快 */
    flowSpeed?: number;
  }

  class InnerData extends LineData {}

  @registerUI()
  @autoId()
  class InnerCustom extends Line {
    static appearanceTypes = lineCustomCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return lineCustomCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: any;

    constructor(data: any) {
      super({
        strokeWidth: 5,
        stroke: {
          type: 'solid',
          color: '#000000',
        },
        startArrow: 'circle',
        endArrow: 'arrow',
        cornerRadius: 0,
        ...data,
      });
    }
  }
}
