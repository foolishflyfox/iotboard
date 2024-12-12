import {
  boundsType,
  Box,
  BoxData,
  dataProcessor,
  registerUI,
  Text,
  type IBoxData,
  type IBoxInputData,
  type ITextAlign,
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
    textPadding?: number | number[];
  }
  interface ICustomTextBoxInputData extends IBoxInputData, CustomData {}
  interface ICustomTextBoxData extends IBoxData, CustomData {}
  class InnerData extends BoxData implements ICustomTextBoxData {
    protected _textFill?: string;
    protected _textContent?: string;
    protected _textPadding?: number | number[];
    protected _textAlign?: ITextAlign;

    private getTextUi() {
      return this.__leaf.children![0] as Text;
    }
    protected setTextFill(v: string) {
      this._textFill = v;
      this.getTextUi().fill = v;
    }
    protected setTextContent(v: string) {
      this._textContent = v;
      this.getTextUi().text = v;
    }
    protected setTextPadding(v: number | number[]) {
      this._textPadding = v;
      this.getTextUi().padding = v;
    }
    protected setTextAlign(v: ITextAlign) {
      this._textAlign = v;
      this.getTextUi().textAlign = v;
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

    @boundsType()
    declare public textPadding: number | number[];

    @boundsType()
    declare public textAlign: ITextAlign;

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
      const textPadding = data.textPadding || [3, 5];
      const textAlign = 'left';
      const newData = _.omit(data, ['textContent', 'textFill']);
      newData.children = [
        {
          tag: 'Text',
          text: textContent,
          fill: textFill,
          textAlign,
          verticalAlign: 'top',
          padding: textPadding,
        },
      ];

      super(newData);
      this.textContent = textContent;
      this.textFill = textFill;
      this.textPadding = textPadding;
      this.textAlign = textAlign;
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
    {
      id: '3',
      group,
      name: 'textPadding',
      label: '内边距',
      type: 'jsonInput',
      variable: true,
    },
    {
      id: '4',
      group,
      name: 'textAlign',
      label: '水平对齐',
      type: 'textAlign',
      variable: true,
    },
  ];
  return customCfgs;
}
