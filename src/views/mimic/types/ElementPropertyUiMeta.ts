/** 元素属性元信息 */
export type PropertyUiType =
  | 'colorPicker'
  | 'input'
  | 'input-number'
  | 'checkbox';

export interface ElementPropertyMeta {
  label: string;
  uiType: PropertyUiType;
  /** input-number 使用 */
  min?: number;
  max?: number;
  step?: number;
  showButton?: boolean;
}
