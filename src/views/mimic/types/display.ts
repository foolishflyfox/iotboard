import type { IUIJSONData } from 'leafer-editor';

export interface DisplayData {
  /** 底图 */
  baseMap: {
    /** 背景色 */
    backgroundColor: string;
    /** 尺寸类型 */
    sizeType: string;
    /** 宽度，单位 px */
    width: number;
    /** 高度，单位 px */
    height: number;
  };
  /** 子元素 */
  children?: IUIJSONData[];
}
