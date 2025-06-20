import { UI, registerUI, dataProcessor, UIData } from 'leafer-editor';
import type { IUIInputData, ILeaferCanvas, IRadiusPointData, IUIData } from 'leafer-editor';

// 定义数据

interface ICustomInputData extends IUIInputData {}
interface ICustomData extends IUIData {}

/**
 * UIData 继承自 LeafData，LeafData 的构造函数接受一个参数，表示其作用的 UI 对象
 * 传入参数将被设置到 __leaf 成员变量下
 */
class CustomData extends UIData implements ICustomData {}

// 定义自定义 UI 类
@registerUI()
export class Custom extends UI {
  public get __tag() {
    return 'Custom';
  }

  /**
   * dataProcessor 修饰器会在创建类(注意不是创建类实例)后，执行 dataProcessor 函数
   * 作用是将修饰器中的类参数绑定到 __DataProcessor getter 属性上
   * 在创建 UI 实例时，Leaf 中的 reset 函数中会调用 new this.__DataProcessor(this) 创建
   * 数据处理器，并赋值给 this.__ 成员变量
   */
  @dataProcessor(CustomData)
  public declare __: ICustomData;

  constructor(data: ICustomInputData) {
    super(data);
    // ...
  }

  // 1. 如果通过width、height属性无法确定图形 bounds，需要重写此函数手动计算bounds
  __updateBoxBounds(): void {
    const box = this.__layout.boxBounds;
    const { width, height } = this.__;
    box.x = 0;
    box.y = 0;
    box.width = width!;
    box.height = height!;
  }

  // 2. 绘制碰撞路径
  __drawHitPath(hitCanvas: ILeaferCanvas): void {
    const { context } = hitCanvas;
    // const { context } = this.__hitCanvas!;
    const { x, y, width, height } = this.__layout.boxBounds;
    context.beginPath();
    context.rect(x, y, width, height);
  }

  // 3. 碰撞检测(可选), 不重写此方法时，需要元素有fill或stroke值。
  __hit(inner: IRadiusPointData): boolean {
    const { context } = this.__hitCanvas!;
    if (context.isPointInPath(inner.x, inner.y)) return true;

    // 碰撞半径
    const lineWidth = inner.radiusX * 2; // 可增加自定的线宽
    if (context.lineWidth !== lineWidth) {
      context.lineWidth = lineWidth;
      context.stroke();
    }

    return context.isPointInStroke(inner.x, inner.y);
  }

  // 4. 绘制自定义内容
  __draw(canvas: ILeaferCanvas): void {
    const { context } = canvas;
    const { width, height } = this.__;

    canvas.setStrokeOptions(this.__); // 绘制描边前，需要设置一下描边选项（可选）。

    context.fillStyle = 'blue';
    context.fillRect(0, 0, width! / 2, height!);

    context.strokeStyle = 'blue';
    context.strokeRect(width! / 2, 0.5, width! / 2, height! - 1);
  }
}
