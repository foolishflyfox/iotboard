import { dataProcessor, registerUI, Text, TextData } from 'leafer-ui';
import { autoId } from '@mimic/decorates';
import type { UiCustomCfg } from './custom-ui';

export function customTextGenerate(textCustomCfg: UiCustomCfg) {
  class InnerData extends TextData {}

  @registerUI()
  @autoId()
  class InnerCustom extends Text {
    static appearanceTypes = textCustomCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return textCustomCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: any;

    constructor(data: any) {
      super({
        // strokeWidth: 5,
        // stroke: {
        //   type: 'solid',
        //   color: '#000000',
        // },
        text: 'Text',
        fontSize: 32,
        fontWeight: 400,
        fill: '#000000',
        stroke: {
          type: undefined,
          color: '#FFA500',
        },
        strokeWidth: 2,
        italic: false,
        textDecoration: 'none',
        textAlign: 'left',
        verticalAlign: 'top',
        ...data,
      });
    }
  }
}
