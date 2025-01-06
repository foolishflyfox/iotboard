import type { CustomPropertyCfgs, UiCustomCfg } from './custom-ui';
import {
  boundsType,
  Box,
  BoxData,
  dataProcessor,
  registerUI,
  surfaceType,
  Text,
  type IFontWeight,
  type ITextDecoration,
} from 'leafer-editor';
import { autoId } from '../../decorates';
import '@leafer-in/state';
import '@leafer-in/animate';

export function customButtonGenerate(customCfg: UiCustomCfg) {
  class InnerData extends BoxData {
    protected _textContent?: string;
    protected _textPadding?: number | number[];
    protected _textFontSize?: number;
    protected _textFontWeight?: IFontWeight;
    protected _textItalic?: boolean;
    // protected _textAlign?: ITextAlign;
    // protected _textVerticalAlign?: IVerticalAlign;
    protected _textDecoration?: ITextDecoration;
    protected _defaultFill?: string;
    protected _defaultTextFill?: string;
    protected _hoverFill?: string;
    protected _hoverTextFill?: string;
    protected _pressFill?: string;
    protected _pressTextFill?: string;

    private getTextUi(): Text | undefined {
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

    protected setTextPadding(v: number | number[]) {
      this._textPadding = v;
      this.setTextUiAttr('padding', v);
    }

    protected setTextFontSize(v: number) {
      this._textFontSize = v;
      this.setTextUiAttr('fontSize', v);
    }

    // protected setTextAlign(v: ITextAlign) {
    //   this._textAlign = v;
    //   this.getTextUi().textAlign = v;
    // }

    // protected setTextVerticalAlign(v: IVerticalAlign) {
    //   this._textVerticalAlign = v;
    //   this.getTextUi().verticalAlign = v;
    // }

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

    protected setDefaultFill(v: string) {
      this._defaultFill = v;
      this.__leaf.fill = v;
    }

    protected setDefaultTextFill(v: string) {
      this._defaultTextFill = v;
      this.setTextUiAttr('fill', v);
    }

    protected setHoverFill(v: string) {
      this._hoverFill = v;
      this.__leaf.hoverStyle!.fill = v;
    }

    protected setHoverTextFill(v: string) {
      this._hoverTextFill = v;
      // this.getTextUi().hoverStyle!.fill = v;
      if (this.getTextUi()) {
        this.getTextUi()!.hoverStyle!.fill = v;
      }
    }

    protected setPressFill(v: string) {
      this._pressFill = v;
      this.__leaf.pressStyle!.fill = v;
    }

    protected setPressTextFill(v: string) {
      this._pressTextFill = v;
      if (this.getTextUi()) {
        this.getTextUi()!.pressStyle!.fill = v;
      }
    }
  }

  @registerUI()
  @autoId()
  class InnerCustom extends Box {
    static appearanceTypes = customCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return customCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: any;

    @surfaceType()
    declare public textContent: string;

    @boundsType()
    declare public textPadding: number | number[];

    @boundsType()
    declare public textFontSize: number;

    @boundsType()
    declare public textFontWeight: IFontWeight;

    // @boundsType()
    // declare public textAlign: ITextAlign;

    // @boundsType()
    // declare public textVerticalAlign: IVerticalAlign;

    @surfaceType()
    declare public textDecoration: ITextDecoration;

    @boundsType()
    declare public textItalic: boolean;

    @surfaceType()
    declare public defaultFill: string;

    @surfaceType()
    declare public defaultTextFill: string;

    @surfaceType()
    declare public hoverFill: string;

    @surfaceType()
    declare public hoverTextFill: string;

    @surfaceType()
    declare public pressFill: string;

    @surfaceType()
    declare public pressTextFill: string;

    constructor(data: any) {
      if (data.tag) delete data.tag;
      const {
        textContent = 'Button',
        textFontSize = 22,
        textFontWeight = 400,
        textItalic = false,
        // textAlign = 'center',
        // textVerticalAlign = 'middle',
        textDecoration = 'none',
        textPadding = [5, 20],
        defaultFill = '#409EFF',
        defaultTextFill = '#FFFFFFFF',
        hoverFill = '#90C6FEFF',
        hoverTextFill = '#FFFFFFFF',
        pressFill = '#397FC6FF',
        pressTextFill = '#FFFFFFFF'
      } = data;
      super({
        stroke: {
          type: 'solid',
          color: '#888888',
        },
        strokeWidth: 0,
        fill: defaultFill,
        cornerRadius: 5,
        origin: 'center',
        button: true,
        hoverStyle: {
          fill: hoverFill,
        },
        pressStyle: {
          fill: pressFill
        },
        children: [{
          tag: 'Text',
          text: textContent,
          fontSize: textFontSize,
          italic: textItalic,
          textDecoration,
          fontWeight: textFontWeight,
          padding: textPadding,
          fill: defaultTextFill,
          hoverStyle: { fill: hoverTextFill }, // 鼠标 hover 到 button 上的状态
          pressStyle: { fill: pressTextFill }
        }],
        ...data
      });
      this.textContent = textContent;
      this.textPadding = textPadding;
      this.textFontSize = textFontSize;
      this.textFontWeight = textFontWeight;
      this.textItalic = textItalic;
      this.textDecoration = textDecoration;
      this.defaultFill = defaultFill;
      this.defaultTextFill = defaultTextFill;
      this.hoverFill = hoverFill;
      this.hoverTextFill = hoverTextFill;
      this.pressFill = pressFill;
      this.pressTextFill = pressTextFill;
    }
  }
  const textGroup = '文本';
  const defaultState = '默认状态';
  const hoverState = '悬停状态';
  const pressState = '按下状态';
  let id = 1;
  const customCfgs: CustomPropertyCfgs = [{
    id: id++,
    group: textGroup,
    name: 'textContent',
    label: '内容',
    type: 'string',
    variable: true
  }, {
    id: id++,
    group: textGroup,
    name: 'textFontSize',
    label: '字体大小',
    type: 'number',
    variable: true,
  }, {
    id: id++,
    group: textGroup,
    name: 'textFontWeight',
    label: '字体粗细',
    type: 'textFontWeight',
    variable: true,
  }, {
    id: id++,
    group: textGroup,
    name: 'textPadding',
    label: '内边距',
    type: 'jsonInput',
    variable: true,
  }, {
    id: id++,
    group: textGroup,
    name: 'textItalic',
    label: '斜体',
    type: 'checkbox',
    variable: true,
  }, {
    id: id++,
    group: textGroup,
    name: 'textDecoration',
    label: '文本装饰',
    type: 'textDecoration',
    variable: true,
  }, {
    id: id++,
    group: defaultState,
    name: 'defaultFill',
    label: '填充',
    type: 'color',
    variable: true
  }, {
    id: id++,
    group: defaultState,
    name: 'defaultTextFill',
    label: '文本颜色',
    type: 'color',
    variable: true
  }, {
    id: id++,
    group: hoverState,
    name: 'hoverFill',
    label: '填充',
    type: 'color',
    variable: true
  }, {
    id: id++,
    group: hoverState,
    name: 'hoverTextFill',
    label: '文本颜色',
    type: 'color',
    variable: true
  }, {
    id: id++,
    group: pressState,
    name: 'pressFill',
    label: '填充',
    type: 'color',
    variable: true
  }, {
    id: id++,
    group: pressState,
    name: 'pressTextFill',
    label: '文本颜色',
    type: 'color',
    variable: true
  }];
  return customCfgs;
}
