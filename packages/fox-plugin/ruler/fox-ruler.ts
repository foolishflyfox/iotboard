import type { ICanvasContext2D, IUI } from 'leafer-editor';
import { App, LayoutEvent, Leafer, RenderEvent, ResizeEvent, EditorEvent } from 'leafer-editor';
import type { ThemeOption, RulerConfig, RulerOptions } from './types';

type TAxis = 'x' | 'y';
interface Rect {
  left: number;
  top: number;
  width: number;
  height: number
}

const PiBy180 = Math.PI / 180;

export type HighlightRect = {
  skip?: TAxis
} & Rect;

export class FoxRuler {
  private app: App;
  public readonly rulerLeafer: Leafer;
  private readonly contextContainer: ICanvasContext2D;

  private options: RulerOptions;
  private config: RulerConfig;

  /**
   * 选取对象矩形坐标
   */
  private objectRect:
    | undefined
    | {
      x: HighlightRect[]
      y: HighlightRect[]
    };

  constructor(app: App, config?: RulerConfig, options?: RulerOptions) {
    this.app = app;
    // 在 app 中添加一个 Leafer 层，app.children 中的层级为 ground / tree / sky /rulerLeafer
    this.rulerLeafer = app.addLeafer();
    // 获取 canvas 的 2d context
    this.contextContainer = this.rulerLeafer.canvas.context;
    this.options = options || {
      ruleSize: 20,
      fontSize: 10,
      themes: new Map<string, ThemeOption>([
        ['light', {
          backgroundColor: '#fff',
          textColor: '#444',
          borderColor: '#ccc',
          highlightColor: '#165dff3b'
        }],
        ['dark', {
          backgroundColor: '#242424',
          textColor: '#ddd',
          borderColor: '#555',
          highlightColor: 'rgba(22,93,255,0.55)'
        }]
      ])
    };
    this.config = config || { enabled: true, theme: 'light' };
    // 因为要传给其他对象使用，不 bind 时，函数调用时 this 可以会出错
    this.forceRender = this.forceRender.bind(this);
    this.resize = this.resize.bind(this);
    this.enabled = this.config.enabled;
  }

  public changeTheme(value: string) {
    this.theme = value;
  }

  public set theme(value: string) {
    this.config.theme = value;
    this.forceRender();
  }

  public get theme() {
    return this.config.theme;
  }

  /**
   * 添加主题
   * @param key
   * @param theme
   */
  public addTheme(key: string, theme: ThemeOption) {
    this.options?.themes?.set(key, theme);
  }

  /**
   * 删除主题
   * @param key
   */
  public removeTheme(key: string) {
    this.options?.themes?.delete(key);
  }

  public changeEnabled(value: boolean) {
    this.enabled = value;
  }

  public get enabled() {
    return this.config.enabled;
  }

  public set enabled(value: boolean) {
    this.config.enabled = value;
    if (value) {
      this.app.tree.on(LayoutEvent.AFTER, this.forceRender);
      this.app.tree.on(ResizeEvent.RESIZE, this.resize);
      this.app.editor?.on(EditorEvent.SELECT, this.forceRender);
      this.resize();
    } else {
      this.app.tree.off(RenderEvent.AFTER, this.forceRender);
      this.app.tree.off(ResizeEvent.RESIZE, this.resize);
      this.app.editor?.off(EditorEvent.SELECT, this.forceRender);
      this.rulerLeafer.forceRender();
    }
  }

  public forceRender() {
    if (this.enabled) {
      this.render({ ctx: this.contextContainer });
    }
  }

  public resize() {
    setTimeout(() => {
      if (this.enabled) {
        this.render({ ctx: this.contextContainer });
      }
    }, 100);
  }

  /**
   * 获取画板尺寸
   */
  private getSize() {
    return {
      width: this.app.width,
      height: this.app.height
    };
  }

  private render({ ctx }: { ctx: ICanvasContext2D }) {
    // 设置画布的矩阵信息（默认会带上屏幕像素比），用于解决屏幕像素比的问题
    this.rulerLeafer.canvas.setWorld({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 });

    const { worldTransform } = this.app.tree;
    // tree 的变换参数，context 的变换顺序是先进行线性变换（缩放、旋转、斜切等），再进行平移
    // vpt[4]/vpt[5] 表示最后水平/垂直移动的像素数，
    const vpt = [
      worldTransform.a,
      worldTransform.b,
      worldTransform.c,
      worldTransform.d,
      worldTransform.e,
      worldTransform.f
    ];
    // 计算元素矩形
    this.calcObjectRect();
    // 绘制水平尺子
    this.draw({
      ctx,
      isHorizontal: true,
      rulerLength: this.getSize().width!,
      startCalibration: -(vpt[4] / vpt[0])
    });
    // 绘制垂直尺子
    this.draw({
      ctx,
      isHorizontal: false,
      rulerLength: this.getSize().height!,
      startCalibration: -(vpt[5] / vpt[3])
    });
    // 绘制标尺底部矩形和文字
    const themeOption = this.options?.themes?.get(this.config.theme);
    this.drawRect(ctx, {
      left: 0,
      top: 0,
      width: this.options.ruleSize!,
      height: this.options.ruleSize!,
      fill: themeOption?.backgroundColor,
      stroke: themeOption?.borderColor
    });

    this.drawText(ctx, {
      text: 'px',
      left: this.options.ruleSize! / 2,
      top: this.options.ruleSize! / 2,
      align: 'center',
      baseline: 'middle',
      fill: themeOption?.textColor
    });

    /**
     * TODO 待官方支持手动触发app canvas渲染的方法后替换下面方法
     * 临时先这么用，不然拖动frame时标尺层画布渲染会有延迟
     */
    this.app.tree.emit(RenderEvent.END, { renderBounds: this.app.tree.canvas.bounds });
  }

  private draw(opt: {
    ctx: ICanvasContext2D;
    isHorizontal: boolean; // 水平标尺 - true, 垂直标尺 - false
    rulerLength: number; // 标尺的实际长度，单位: 像素
    startCalibration: number; // 右上角点的逻辑坐标值
  }) {
    const { ctx, isHorizontal, rulerLength, startCalibration } = opt;
    const zoom = this.getZoom();

    const gap = this.getGap(zoom);
    // 计算标尺经过缩放后的逻辑长度
    const unitLength = Math.ceil(rulerLength / zoom);
    // 计算绘制标尺的起始值
    const startValue = Math.floor(startCalibration / gap) * gap;
    const startOffset = startValue - startCalibration;
    const canvasSize = this.getSize();

    const themeOption = this.options?.themes?.get(this.config.theme);
    const { ruleSize } = this.options;
    // 文字顶部偏移
    const padding = 2.5;

    // 背景
    this.drawRect(ctx, {
      left: 0,
      top: 0,
      width: isHorizontal ? canvasSize.width! : ruleSize!,
      height: isHorizontal ? ruleSize! : canvasSize.height!,
      fill: themeOption?.backgroundColor,
      stroke: themeOption?.borderColor
    });

    // 标尺刻度线显示
    for (let pos = 0; pos + startOffset <= unitLength; pos += gap) {
      for (let index = 0; index < 10; index++) {
        const position = Math.round((startOffset + pos + (gap * index) / 10) * zoom);
        const isMajorLine = index === 0;
        const [left, top] = isHorizontal
          ? [position, isMajorLine ? 0 : ruleSize! - 8]
          : [isMajorLine ? 0 : ruleSize! - 8, position];
        const [width, height] = isHorizontal ? [0, ruleSize! - top] : [ruleSize! - left, 0];
        this.drawLine(ctx, {
          left,
          top,
          width,
          height,
          stroke: themeOption?.borderColor
        });
      }
    }

    // 标尺蓝色遮罩
    if (this.objectRect) {
      const axis = isHorizontal ? 'x' : 'y';
      this.objectRect[axis].forEach((rect) => {
        // 跳过指定矩形
        if (rect.skip === axis) {
          return;
        }
        // TODO
        const [left, top, width, height] = isHorizontal
          ? [(rect.left - startCalibration) * zoom, 0, rect.width * zoom, ruleSize!]
          : [0, (rect.top - startCalibration) * zoom, ruleSize!, rect.height * zoom];

        // 高亮遮罩
        // ctx.save()
        this.drawRect(ctx, {
          left,
          top,
          width,
          height,
          fill: themeOption?.highlightColor
        });
        // ctx.restore()
      });
    }

    // 标尺文字显示
    for (let pos = 0; pos + startOffset <= unitLength; pos += gap) {
      const position = (startOffset + pos) * zoom;
      const textValue = (startValue + pos).toString();

      const [left, top, angle] = isHorizontal
        ? [position + 6, padding, 0]
        : [padding, position - 6, -90];

      this.drawText(ctx, {
        text: textValue,
        left,
        top,
        fill: themeOption?.textColor,
        angle
      });
    }
    // draw end
  }

  /**
   * 根据缩放大小计算一个大格的逻辑长度，一个大格有10个小格
   * @param zoom 缩放大小
   * @returns 一个大格的逻辑长度
   */
  private getGap(zoom: number) {
    const zooms = [0.02, 0.03, 0.05, 0.1, 0.2, 0.5, 1, 2, 5];
    const gaps = [5000, 2500, 1000, 500, 200, 100, 50, 20, 10];

    let i = 0;
    while (i < zooms.length && zooms[i] < zoom) {
      i++;
    }

    return gaps[i - 1] || 10000;
  }

  private drawRect(
    ctx: ICanvasContext2D,
    {
      left,
      top,
      width,
      height,
      fill,
      stroke,
      strokeWidth
    }: {
      left: number
      top: number
      width: number
      height: number
      fill?: string | CanvasGradient | CanvasPattern
      stroke?: string
      strokeWidth?: number
    }
  ) {
    ctx.save();
    ctx.beginPath();
    fill && (ctx.fillStyle = fill);
    ctx.rect(left, top, width, height);
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = strokeWidth ?? 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  private drawText(
    ctx: ICanvasContext2D,
    {
      left,
      top,
      text,
      fill,
      align,
      angle,
      fontSize,
      baseline
    }: {
      left: number
      top: number
      text: string
      fill?: string | CanvasGradient | CanvasPattern
      align?: CanvasTextAlign
      baseline?: CanvasTextBaseline
      angle?: number
      fontSize?: number
    }
  ) {
    ctx.save();
    fill && (ctx.fillStyle = fill);
    ctx.textAlign = align ?? 'left';
    ctx.textBaseline = baseline ?? 'top';
    ctx.font = `${fontSize ?? 12}px Helvetica`;
    if (angle) {
      ctx.translate(left, top);
      ctx.rotate(PiBy180 * angle);
      ctx.translate(-left, -top);
    }
    ctx.fillText(text, left, top);
    ctx.restore();
  }

  private drawLine(
    ctx: ICanvasContext2D,
    {
      left,
      top,
      width,
      height,
      stroke,
      lineWidth
    }: {
      left: number
      top: number
      width: number
      height: number
      stroke?: string | CanvasGradient | CanvasPattern
      lineWidth?: number
    }
  ) {
    ctx.save();
    ctx.beginPath();
    stroke && (ctx.strokeStyle = stroke);
    ctx.lineWidth = lineWidth ?? 1;
    ctx.moveTo(left, top);
    ctx.lineTo(left + width, top + height);
    ctx.stroke();
    ctx.restore();
  }

  private calcObjectRect() {
    const activeObjects = this.app.editor?.list || [];
    if (activeObjects.length === 0) {
      this.objectRect = undefined;
      return;
    }

    const allRect = activeObjects.reduce((rects: HighlightRect[], obj: IUI) => {
      const bounds = obj.getBounds('box', this.app.tree);
      const rect: HighlightRect = {
        left: bounds.x,
        top: bounds.y,
        width: bounds.width,
        height: bounds.height
      };
      rects.push(rect);
      return rects;
    }, [] as HighlightRect[]);
    if (allRect.length === 0) return;
    this.objectRect = {
      x: this.mergeLines(allRect, true),
      y: this.mergeLines(allRect, false)
    };
  }

  private mergeLines(rect: Rect[], isHorizontal: boolean) {
    const axis = isHorizontal ? 'left' : 'top';
    const length = isHorizontal ? 'width' : 'height';
    // 先按照 axis 的大小排序
    rect.sort((a, b) => a[axis] - b[axis]);
    const mergedLines: Rect[] = [];
    let currentLine = Object.assign({}, rect[0]);
    for (let i = 1; i < rect.length; i++) {
      const line = Object.assign({}, rect[i]);
      if (currentLine[axis] + currentLine[length] >= line[axis]) {
        // 当前线段和下一个线段相交，合并宽度
        currentLine[length]
          = Math.max(currentLine[axis] + currentLine[length], line[axis] + line[length])
            - currentLine[axis];
      } else {
        // 当前线段和下一个线段不相交，将当前线段加入结果数组中，并更新当前线段为下一个线段
        mergedLines.push(currentLine);
        currentLine = Object.assign({}, line);
      }
    }
    // 加入数组
    mergedLines.push(currentLine);
    return mergedLines;
  }

  /**
   * 获取 tree 视图的缩放大小，大于1表示放大，小于1表示缩小
   * @returns
   */
  public getZoom(): number {
    if (this.app.tree) {
      if (typeof this.app.tree.scale === 'number') {
        return this.app.tree.scale;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }

  public dispose(): void {
    this.rulerLeafer.destroy();
    this.enabled = false;
  }
}
