import {
  Box,
  BoxData,
  boundsType,
  dataProcessor,
  registerUI,
  Text,
  type IBoxData,
  type IBoxInputData,
  type ITextAlign,
  type IVerticalAlign,
  type IFontWeight,
  surfaceType,
  type ITextDecoration,
  PropertyEvent,
} from 'leafer-editor';
import { autoId } from '@mimic/decorates';
import * as _ from 'lodash-es';
import type { CustomPropertyCfgs, UiCustomCfg } from './custom-ui';
import { emitter } from '@/utils';

export function customTextBoxGenerate(textBoxCustomCfg: UiCustomCfg) {
  interface CustomData {
    textContent?: string | number;
    textFill?: string;
    textFontSize?: number;
    textFontWeight?: IFontWeight;
    textItalic?: boolean;
    textAlign?: ITextAlign;
    textVerticalAlign?: IVerticalAlign;
    textPadding?: number | number[];
    textDecoration?: ITextDecoration;
  }
  interface ICustomTextBoxInputData extends IBoxInputData, CustomData {}
  interface ICustomTextBoxData extends IBoxData, CustomData {}
  class InnerData extends BoxData implements ICustomTextBoxData {
    protected _textContent?: string;
    protected _textFontSize?: number;
    protected _textFontWeight?: IFontWeight;
    protected _textFill?: string;
    protected _textItalic?: boolean;
    protected _textAlign?: ITextAlign;
    protected _textVerticalAlign?: IVerticalAlign;
    protected _textDecoration?: ITextDecoration;
    protected _textPadding?: number | number[];

    private getTextUi() {
      return this.__leaf.children![0] as Text;
    }

    private setTextUiAttr(attr: string, v: any) {
      const textUi = this.getTextUi();
      if (textUi) {
        textUi[attr] = v;
      }
    }

    protected setTextContent(v: string) {
      this._textContent = v;
      this.setTextUiAttr('text', v);
    }

    protected setTextFill(v: string) {
      this._textFill = v;
      this.setTextUiAttr('fill', v);
    }

    protected setTextFontSize(v: number) {
      this._textFontSize = v;
      this.setTextUiAttr('fontSize', v);
    }

    protected setTextPadding(v: number | number[]) {
      this._textPadding = v;
      this.setTextUiAttr('padding', v);
    }

    protected setTextAlign(v: ITextAlign) {
      this._textAlign = v;
      this.setTextUiAttr('textAlign', v);
    }

    protected setTextVerticalAlign(v: IVerticalAlign) {
      this._textVerticalAlign = v;
      this.setTextUiAttr('verticalAlign', v);
    }

    protected setTextFontWeight(v: IFontWeight) {
      this._textFontWeight = v;
      this.setTextUiAttr('fontWeight', v);
    }

    protected setTextDecoration(v: ITextDecoration) {
      this._textDecoration = v;
      this.setTextUiAttr('textDecoration', v);
    }

    protected setTextItalic(v: boolean) {
      this._textItalic = v;
      this.setTextUiAttr('italic', v);
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
    declare public textFontWeight: IFontWeight;

    @surfaceType()
    declare public textFill: string;

    @boundsType()
    declare public textPadding: number | number[];

    @boundsType()
    declare public textAlign: ITextAlign;

    @boundsType()
    declare public textVerticalAlign: IVerticalAlign;

    @surfaceType()
    declare public textDecoration: ITextDecoration;

    @boundsType()
    declare public textItalic: boolean;

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
        width: 80,
        height: 40,
        event: {
          [PropertyEvent.CHANGE]: (e: PropertyEvent) => {
            const text = this.children[0] as Text;
            if (e.attrName === 'width') {
              text.width = e.newValue as any;
            } else if (e.attrName === 'height') {
              text.height = e.newValue as any;
            }
          }
        },
        ...data,
      };
      const textContent = data.textContent || 'Text';
      const textFontSize = data.textFontSize || 22;
      const textFontWeight = data.textFontWeight || 400;
      const textFill = data.textFill || '#00FF00';
      const textPadding = data.textPadding || [3, 5];
      const textAlign = data.textAlign || 'left';
      const textVerticalAlign = data.textVerticalAlign || 'top';
      const textDecoration = data.textDecoration || 'none';
      const textItalic = data.textItalic || false;
      // const newData = _.omit(data, ['textContent', 'textFill']);
      const newData = _.cloneDeep(data);
      newData.children = [
        {
          tag: 'Text',
          text: textContent,
          fontSize: textFontSize,
          fontWeight: textFontWeight,
          fill: textFill,
          textAlign,
          verticalAlign: textVerticalAlign,
          textDecoration,
          padding: textPadding,
          italic: textItalic,
          width: data.width,
          height: data.height,
          event: {
            [PropertyEvent.CHANGE]: (e: PropertyEvent) => {
              if (e.attrName === 'text') {
                if (this.proxyData) {
                  this.proxyData.textContent = e.newValue as string;
                  emitter.emit('mimicUpdateAttr', 'textContent');
                }
              }
            }
          }
        },
      ];

      super(newData);
      this.textContent = textContent;
      this.textFontSize = textFontSize;
      this.textFontWeight = textFontWeight;
      this.textFill = textFill;
      this.textPadding = textPadding;
      this.textAlign = textAlign;
      this.textVerticalAlign = textVerticalAlign;
      this.textDecoration = textDecoration;
      this.textItalic = textItalic;
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
      extra: {
        min: 1,
      },
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
      name: 'textFontWeight',
      label: '字体粗细',
      type: 'textFontWeight',
      variable: true,
    },
    {
      id: id++,
      group,
      name: 'textItalic',
      label: '斜体',
      type: 'checkbox',
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
      name: 'textDecoration',
      label: '文本装饰',
      type: 'textDecoration',
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
