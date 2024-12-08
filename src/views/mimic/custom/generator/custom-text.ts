import type { BaseCustomCfg } from '@mimic/types';
import { dataProcessor, registerUI, Text, TextData } from 'leafer-ui';
import { autoId } from '@mimic/decorates';

export interface TextCustomCfg extends BaseCustomCfg {}

export function customTextGenerate(textCustomCfg: TextCustomCfg) {
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
        fill: '#000000',
        fontWeight: 400,
        ...data,
      });
    }
  }
}
