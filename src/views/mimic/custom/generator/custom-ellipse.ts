import type { BaseCustomCfg } from '@mimic/types';
import { dataProcessor, Ellipse, EllipseData, registerUI } from 'leafer-ui';
import { autoId } from '@mimic/decorates';

export interface EllipseCustomCfg extends BaseCustomCfg {}

export function customEllipseGenerate(ellipseCustomCfg: EllipseCustomCfg) {
  class InnerData extends EllipseData {}

  @registerUI()
  @autoId()
  class InnerCustom extends Ellipse {
    static appearanceTypes = ellipseCustomCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return ellipseCustomCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: any;

    constructor(data: any) {
      data = {
        x: 0,
        y: 0,
        width: 80,
        height: 50,
        stroke: '#000000',
        strokeWidth: 5,
        ...data,
      };
      super(data);
    }
  }
}
