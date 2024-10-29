import { UI, registerUI, dataProcessor, UIData, boundsType } from 'leafer-ui';
import type { IUIInputData, ILeaferCanvas, IRadiusPointData, IUIData } from 'leafer-ui';
import { autoId } from '@mimic/decorates';
import { customMetas } from '@mimic/utils';
import { getCommonAppearancePropertyTypes } from '../types';

// 定义数据
interface CustomData {
  min?: string;
  max?: string;
  unit?: string;
  value?: string;
}

interface ICustomGaugeInputData extends IUIInputData, CustomData {}

interface ICustomGaugeData extends IUIData, CustomData {}

class CustomGaugeData extends UIData implements ICustomGaugeData {
  protected _min?: string;
  protected _max?: string;
  protected _unit?: string;
  protected _value?: string;
  protected setMin(v: string) {
    this._min = v;
  }
  protected setMax(v: string) {
    this._max = v;
  }
  protected setUnit(v: string) {
    this._unit = v;
  }
  protected setValue(v: string) {
    this._value = v;
  }
}

// 定义类
@registerUI()
@autoId()
export class CustomGauge extends UI {
  static appearancePropertyTypes = getCommonAppearancePropertyTypes([
    'fill',
    'stroke',
    'strokeWidth',
  ]);
  public get __tag() {
    return customMetas.customGauge.name;
  }

  @dataProcessor(CustomGaugeData)
  public declare __: ICustomGaugeData;

  @boundsType('0')
  public declare min: string;

  @boundsType('300')
  public declare max: string;

  @boundsType('30')
  public declare value: string;

  @boundsType('km/h')
  public declare unit: string;

  constructor(data: ICustomGaugeInputData) {
    data.width = data.width ?? 80;
    data.height = data.height ?? 80;
    super(data);
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
    const { width, height } = this.__layout.boxBounds;
    context.save();
    context.scale(width! / 400, height! / 400);
    context.beginPath();
    context.arc(200, 200, 200 * 0.95, 0, Math.PI * 2);
    context.restore();
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
    const ctx = canvas!.context;
    // const ctx = this.__hitCanvas?.context!;
    const obj = this.__;
    // const x = obj.x!;
    // const y = obj.y!;
    // this.scaleX = obj.width! / 400;
    // this.scaleY = obj.height! / 400;
    ctx.scale(obj.width! / 400, obj.height! / 400);
    const x = 0;
    const y = 0;
    const width = 400;
    const height = 400;
    const side = Math.min(width, height);

    canvas.setStrokeOptions(this.__); // 绘制描边前，需要设置一下描边选项（可选）。
    const cx = x + width / 2;
    const cy = y + height / 2;

    const r_in = (Math.min(width, height) / 2) * 0.65;
    const r_out = (Math.min(width, height) / 2) * 0.9;
    const arc_angle = Math.PI * 2;

    // 内环
    ctx.beginPath();
    const gra = ctx.createLinearGradient(cx, cy - r_in, cx, cy + r_in);
    gra.addColorStop(0, '#3485DB');
    gra.addColorStop(1, '#1A3494');
    ctx.fillStyle = gra;
    ctx.arc(cx, cy, r_in, 0, arc_angle);
    ctx.fill();

    // 外环
    ctx.beginPath();
    ctx.strokeStyle = '#E2E7FB';
    ctx.lineWidth = 25;
    ctx.lineCap = 'round';
    const start_out = 1 / 4 + 1 / 12;
    const end_out = 1 + 1 / 6;

    ctx.arc(cx, cy, r_out, arc_angle * start_out, arc_angle * end_out);
    ctx.stroke();

    // 外环数值进度
    const valComp = Number(this.value);
    const val = isNaN(valComp) ? 0 : valComp;
    const unit = this.unit;
    const max = Number(this.max);
    const min = Number(this.min);

    ctx.beginPath();
    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    // // 每个刻度18°，左下右下各留2个刻度空间
    const start = 1 / 4 + ((1 / 4) * 2) / 5;
    const end = 1 + ((1 / 4) * 3) / 5;
    const turbo = (end - start) * (val / max);
    // 分两步绘制圆弧
    // 第一步
    const left_s = val <= max / 2 ? turbo : (end - start) / 2;
    const gra2_1 = ctx.createLinearGradient(
      x + width / 2,
      y + height * 0.1,
      x + width / 2,
      y + height * 0.8,
    );
    gra2_1.addColorStop(0, '#7BB9F0');
    gra2_1.addColorStop(1, '#91FFFD');
    ctx.strokeStyle = gra2_1;
    ctx.arc(cx, cy, r_out, arc_angle * start_out, arc_angle * (start + left_s));
    ctx.stroke();

    // 第二步
    if (val > max / 2) {
      ctx.beginPath();
      const gra2_2 = ctx.createLinearGradient(
        x + width / 2,
        y + height * 0.1,
        x + width / 2,
        y + height * 0.8,
      );
      gra2_2.addColorStop(0, '#7BB9F0');
      gra2_2.addColorStop(1, '#5748DA');
      ctx.strokeStyle = gra2_2;
      ctx.arc(cx, cy, r_out, (arc_angle * 3) / 4, arc_angle * (start + turbo + 1 / 80));
      ctx.stroke();
    }

    // 量程提示圆弧
    const start_range = ((1 / 4) * 4) / 5;
    const end_range = 1 / 4 + ((1 / 4) * 1) / 5;
    ctx.beginPath();
    const gra4 = ctx.createLinearGradient(x + width / 3, height, x + (width * 2) / 3, height);
    gra4.addColorStop(0, '#F4F5F8');
    gra4.addColorStop(0.5, '#488CDF');
    gra4.addColorStop(1, '#F4F5F8');
    ctx.strokeStyle = gra4;
    ctx.lineWidth = 8;
    ctx.arc(cx, cy, r_out, arc_angle * start_range, arc_angle * end_range);
    ctx.stroke();

    // 量程范围文字
    ctx.font = '20px Arial';
    const max_x = cx + Math.cos((4 * 18 * Math.PI) / 180) * (r_out + 24);
    const max_y = cy + Math.sin((4 * 18 * Math.PI) / 180) * (r_out + 24);
    ctx.fillText(max.toString(), max_x, max_y - 2);
    const min_x = cx + Math.cos((6 * 18 * Math.PI) / 180) * (r_out + 24);
    const min_y = cy + Math.sin((6 * 18 * Math.PI) / 180) * (r_out + 24);
    ctx.fillText(min.toString(), min_x - 12, min_y - 2);

    // 20个刻度线
    let theta = 0;
    for (let i = 0; i < 20; i += 1) {
      if (i > 3 && i < 7) {
        theta += (18 * Math.PI) / 180;
        continue;
      }
      ctx.beginPath();
      const line_begin = {
        x: cx + Math.cos(theta) * (r_out - 30),
        y: cy + Math.sin(theta) * (r_out - 30),
      };
      const line_end = {
        x: cx + Math.cos(theta) * (r_out - 24),
        y: cy + Math.sin(theta) * (r_out - 24),
      };
      ctx.moveTo(line_begin.x, line_begin.y);
      ctx.lineTo(line_end.x, line_end.y);
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#3639CB';
      ctx.stroke();
      theta += (18 * Math.PI) / 180;
    }

    // 量程指针
    const clockRadius = width / 2;
    ctx.save();
    ctx.translate(clockRadius, clockRadius);
    ctx.beginPath();

    ctx.save();
    // 20表示所有刻度份数，7表示起始刻度
    const theta2 = (((20 - 4) * (val / max) + 7) * 2 * Math.PI) / 20;
    ctx.rotate(theta2);
    ctx.beginPath();
    ctx.moveTo(-10, -8);
    ctx.lineTo(-10, 8);
    ctx.lineTo((width / 2) * 0.9, 4);
    ctx.lineTo((width / 2) * 0.9, -4);
    const gra3 = ctx.createLinearGradient(-10, -8, (width / 2) * 0.9, 4);
    gra3.addColorStop(0, '#B9275E66');
    gra3.addColorStop(0.6, '#E25878ff');
    ctx.fillStyle = gra3;
    ctx.fill();
    ctx.restore();

    ctx.restore();

    // 数值文字
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFF';

    ctx.font = '60px Arial bolder';
    ctx.fillText(valComp.toString(), cx, cy - 20);
    ctx.fillText(unit, cx, cy + 40);
  }
}
