import { isNil } from 'lodash-es';
import type { IPenInputData, IPenData, IPen } from 'leafer-editor';
import { registerUI, dataProcessor, Pen, PenData, boundsType } from 'leafer-editor';

export interface ICustomPen extends IPen {
  createShapes: () => void;
}
export interface ICustomPenInputData extends IPenInputData {
  size?: number;
}
export interface ICustomPenData extends IPenData {
  size?: number;
}

export class CustomPenData extends PenData implements ICustomPenData {
  protected _size?: number;

  protected setSize(value: number): void {
    this._size = value;
    (this.__leaf as CustomPen).createShapes();
  }
}
@registerUI()
export class CustomPen extends Pen implements ICustomPen {
  public get __tag() {
    return 'CustomPen';
  }

  @dataProcessor(CustomPenData)
  public declare __: ICustomPenData;

  @boundsType(0)
  public declare size: number; // 增加自定义属性， 注意必须加上 declare 关键词

  constructor(data: ICustomPenInputData) {
    super(data);
  }

  // 根据size创建组合图形
  public createShapes(): void {
    this.clear(); // 清除之前创建的路径

    const { size } = this.__;

    if (!isNil(size)) {
      const center = size / 2;

      this.setStyle({ fill: '#FF4B4B', windingRule: 'evenodd' });
      this.roundRect(0, 0, size, size, size / 3).arc(center, center, size / 4);

      this.setStyle({ x: center, y: center, fill: '#FEB027' });
      this.arc(0, 0, size / 5);
    }
  }
}

// const leafer = new Leafer({ view: window });
