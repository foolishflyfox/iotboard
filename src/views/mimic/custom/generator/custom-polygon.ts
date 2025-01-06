import { dataProcessor, Polygon, PolygonData, registerUI, type IPolygonData, type IPolygonInputData } from 'leafer-editor';
import type { UiCustomCfg } from './custom-ui';
import { autoId } from '@mimic/decorates';

export function customPolygonGenerate(customCfg: UiCustomCfg) {
  interface CustomData {}

  interface ICustomPolygonInputData extends IPolygonInputData, CustomData {}
  interface ICustomPolygonData extends IPolygonData, CustomData {}

  class InnerData extends PolygonData implements ICustomPolygonData {}

  @registerUI()
  @autoId()
  class InnerCustom extends Polygon {
    static appearanceTypes = customCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return customCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: any;

    constructor(data: ICustomPolygonInputData) {
      super({
        strokeWidth: 5,
        stroke: {
          type: 'solid',
          color: '#000000',
        },
        fill: '#00BFFF00',
        strokeJoin: 'round',
        cornerRadius: 0,
        ...data
      });
    }
  }
}
