import {
  boundsType,
  Box,
  BoxData,
  dataProcessor,
  registerUI,
  Text,
  type IBoxData,
  type IBoxInputData,
} from 'leafer-ui';
import { autoId } from '@mimic/decorates';
import type { BaseCustomCfg } from '@mimic/types';
import * as _ from 'lodash-es';

export interface TextBoxCustomCfg extends BaseCustomCfg {}

export function customTextBoxGenerate(textBoxCustomCfg: TextBoxCustomCfg) {
  interface CustomData {
    textContent?: string | number;
    textFill?: string;
  }
  interface ICustomTextBoxInputData extends IBoxInputData, CustomData {}
  interface ICustomTextBoxData extends IBoxData, CustomData {}
  class InnerData extends BoxData implements ICustomTextBoxData {
    protected _textFill?: string;
    protected setTextFill(v: string) {
      this._textFill = v;
      // console.log('@@@', this.__leaf.children?.length);
      console.log('@@@ text fill:', v);
      if (this.__leaf.children?.length) {
        const text: Text = this.__leaf.children[0] as Text;
        text.fill = v;
      }
    }
  }

  @registerUI()
  @autoId()
  class InnerCustom extends Box {
    static appearanceTypes = textBoxCustomCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return textBoxCustomCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: ICustomTextBoxData;

    @boundsType()
    declare public textContent: string | number;

    @boundsType()
    declare public textFill: string;

    constructor(data: ICustomTextBoxInputData) {
      data = {
        textBox: true,
        stroke: {
          type: 'solid',
          color: '#97694F',
        },
        strokeWidth: 3,
        fill: '#FF4B4B',
        cornerRadius: 3,
        ...data,
      };
      const textContent = data.textContent || 'Text';
      const textFill = data.textFill || '#00FF00';
      const newData = _.omit(data, ['textContent', 'textFill']);
      newData.children = [
        {
          tag: 'Text',
          text: textContent,
          fill: textFill,
          textAlign: 'left',
          verticalAlign: 'top',
        },
      ];
      console.log('newData =', newData);

      super(newData);
      this.textContent = textContent;
      this.textFill = textFill;

      setTimeout(() => {
        this.textFill = '#0000FF';
      }, 1000);
    }
  }
}
