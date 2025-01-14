import {
  dataProcessor,
  dataType,
  Rect,
  RectData,
  registerUI,
  type IRectData,
  type IRectInputData,
} from 'leafer-editor';
import { customMetas } from '@mimic/utils';
import { getCommonAppearanceTypes } from '@mimic/types';
import { autoId } from '@mimic/decorates';

// 1. 定义数据接口，需要为输入数据、计算数据定义接口，js 可忽略
// 1.1 定义数据接口，命名规范为: I + 元素名 + InputData
export interface ICustomRectInputData extends IRectInputData {
  // 输入数据接口，需要定义为可选项
  // top?: number;
}

// 1.2 定义计算数据接口，命名规范为: I + 元素名 + Data
export interface ICustomRectData extends IRectData {
  // top?: number;
}

// 2. 定义计算数据类，需要实现之前的计算数据类接口，命名规范为: 元素名 + Data
export class CustomRectData extends RectData implements ICustomRectData {}

@registerUI()
@autoId()
export class CustomRect extends Rect {
  static appearanceTypes = getCommonAppearanceTypes();

  public get __tag() {
    return customMetas.customRect.name;
  }

  @dataProcessor(CustomRectData)
  public declare __: ICustomRectData;

  @dataType(0)
  public declare top: string;

  constructor(data: ICustomRectInputData) {
    data = {
      width: 80,
      height: 80,
      stroke: { type: 'solid', color: '#000000FF' },
      fill: { type: 'solid', color: '#ffffff00' },
      strokeWidth: 5,
      cornerRadius: 10,
      ...data,
    };

    super(data);
  }
}
