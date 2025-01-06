import { dataProcessor, Ellipse, EllipseData, registerUI } from 'leafer-editor';
import { autoId } from '@mimic/decorates';
import type { UiCustomCfg } from './custom-ui';

export function customEllipseGenerate(ellipseCustomCfg: UiCustomCfg) {
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
        stroke: {
          type: 'solid',
          color: '#000000',
        },
        fill: '#00BFFF00',
        strokeWidth: 5,
        ...data,
      };
      super(data);
    }
  }
}
