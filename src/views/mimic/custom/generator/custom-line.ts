import type { BaseCustomCfg } from '@mimic/types';
import { dataProcessor, Line, LineData, registerUI } from 'leafer-ui';
import { autoId } from '@mimic/decorates';

export interface LineCustomCfg extends BaseCustomCfg {}

export function customLineGenerate(lineCustomCfg: LineCustomCfg) {
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
      // data = {
      //   x: 0,
      //   y: 0,
      //   width: 80,
      //   height: 50,
      //   stroke: '#000000',
      //   strokeWidth: 5,
      //   ...data,
      // };
      super({
        strokeWidth: 5,
        stroke: {
          type: 'solid',
          color: '#000000',
        },
        startArrow: 'circle',
        endArrow: 'arrow',
        ...data,
      });
    }
  }
}
