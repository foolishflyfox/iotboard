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
import type { CustomPropertyCfgs } from './custom-ui';

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
    protected _textContent?: string;
    protected setTextFill(v: string) {
      this._textFill = v;
      // console.log('@@@', this.__leaf.children?.length);
      if (this.__leaf.children?.length) {
        const text: Text = this.__leaf.children[0] as Text;
        text.fill = v;
      }
    }
    protected setTextContent(v: string) {
      this._textContent = v;
      if (this.__leaf.children?.length) {
        const text: Text = this.__leaf.children[0] as Text;
        text.text = v;
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
    }
  }
  const group = '文本';
  const customCfgs: CustomPropertyCfgs = [
    {
      id: '1',
      group,
      name: 'textFill',
      label: '填充色',
      type: 'color',
      variable: true,
    },
    {
      id: '2',
      group,
      name: 'textContent',
      label: '内容',
      type: 'string',
      variable: true,
    },
  ];
  return customCfgs;
}
