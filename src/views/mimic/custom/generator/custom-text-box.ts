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
  type IVerticalAlign,
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
    textAlign?: ITextAlign;
    textVerticalAlign?: IVerticalAlign;
    textFontSize?: number;
  }
  interface ICustomTextBoxInputData extends IBoxInputData, CustomData {}
  interface ICustomTextBoxData extends IBoxData, CustomData {}
  class InnerData extends BoxData implements ICustomTextBoxData {
    protected _textContent?: string;
    protected _textFontSize?: number;
    protected _textFill?: string;
    protected _textPadding?: number | number[];
    protected _textAlign?: ITextAlign;
    protected _textVerticalAlign?: IVerticalAlign;

    private getTextUi() {
      return this.__leaf.children![0] as Text;
    }
    protected setTextContent(v: string) {
      this._textContent = v;
      this.getTextUi().text = v;
    }
    protected setTextFill(v: string) {
      this._textFill = v;
      this.getTextUi().fill = v;
    }
    protected setTextFontSize(v: number) {
      this._textFontSize = v;
      this.getTextUi().fontSize = v;
    }
    protected setTextPadding(v: number | number[]) {
      this._textPadding = v;
      this.getTextUi().padding = v;
    }
    protected setTextAlign(v: ITextAlign) {
      this._textAlign = v;
      this.getTextUi().textAlign = v;
    }
    protected setTextVerticalAlign(v: IVerticalAlign) {
      this._textVerticalAlign = v;
      this.getTextUi().verticalAlign = v;
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
    declare public textFontSize: number;

    @boundsType()
    declare public textFill: string;

    @boundsType()
    declare public textPadding: number | number[];

    @boundsType()
    declare public textAlign: ITextAlign;

    @boundsType()
    declare public textVerticalAlign: IVerticalAlign;

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
      const textFontSize = 22;
      const textFill = data.textFill || '#00FF00';
      const textPadding = data.textPadding || [3, 5];
      const textAlign = 'left';
      const textVerticalAlign = 'top';
      // const newData = _.omit(data, ['textContent', 'textFill']);
      const newData = _.cloneDeep(data);
      newData.children = [
        {
          tag: 'Text',
          text: textContent,
          fontSize: textFontSize,
          fill: textFill,
          textAlign,
          verticalAlign: textVerticalAlign,
          padding: textPadding,
        },
      ];

      super(newData);
      this.textContent = textContent;
      this.textFontSize = textFontSize;
      this.textFill = textFill;
      this.textPadding = textPadding;
      this.textAlign = textAlign;
      this.textVerticalAlign = textVerticalAlign;
    }
  }
  const group = '文本';
  let id = 1;
  const customCfgs: CustomPropertyCfgs = [
    {
      id: id++,
      group,
      name: 'textContent',
      label: '内容',
      type: 'string',
      variable: true,
    },
    {
      id: id++,
      group,
      name: 'textFontSize',
      label: '字体大小',
      type: 'number',
      variable: true,
    },
    {
      id: id++,
      group,
      name: 'textFill',
      label: '填充色',
      type: 'color',
      variable: true,
    },
    {
      id: id++,
      group,
      name: 'textAlign',
      label: '水平对齐',
      type: 'textAlign',
      variable: true,
    },
    {
      id: id++,
      group,
      name: 'textVerticalAlign',
      label: '垂直对齐',
      type: 'textVerticalAlign',
      variable: true,
    },
    {
      id: id++,
      group,
      name: 'textPadding',
      label: '内边距',
      type: 'jsonInput',
      variable: true,
    },
  ];
  return customCfgs;
}
