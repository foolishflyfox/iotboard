import { dataProcessor, Polygon, PolygonData, registerUI, type IPolygonData } from 'leafer-editor';
import type { UiCustomCfg } from './custom-ui';
import { autoId } from '@mimic/decorates';

export function customRegularPolygonGenerate(uiCustomCfg: UiCustomCfg) {
  interface CustomData {}

  interface ICustomRegularPolygonInputData extends Polygon, CustomData {}
  interface ICustomRegularPolygonData extends IPolygonData, CustomData {}

  class InnerData extends PolygonData implements ICustomRegularPolygonData {}

  @registerUI()
  @autoId()
  class InnerCustom extends Polygon {
    static appearanceTypes = uiCustomCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return uiCustomCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: any;

    constructor(data: ICustomRegularPolygonInputData) {
      super({
        width: 80,
        height: 80,
        sides: 6,
        stroke: {
          type: 'solid',
          color: '#000000'
        },
        fill: '#00BFFF00',
        strokeWidth: 5,
        cornerRadius: 3,
        ...data
      });
    }
  }
}
