/** 元素属性元信息 */
export type PropertyUiType =
  | 'colorPicker'
  | 'input'
  | 'input-number'
  | 'checkbox';

/** 自定义组件，外观配置类型 */
export interface CustomAppearanceUi {
  /** 配置名，以配置项的 label 方式显示 */
  label: string;
  /** 组件类型 */
  uiType: PropertyUiType;
  /** 默认值 */
  defaultValue?: any;
  /** 如果是 number 类型，设置修改时的单步大小 */
  step?: number;
}

/** 数据生成方式:
 * static - 固定静态
 * random - 随机数
 * script - 指定脚本方式产生(弹出脚本编辑器，添加帮助文档,可搜索,添加智能提示功能)
 */
type DataGenerateType = 'static' | 'random' | 'script';

/** 转换成指定精度的方式: round - 四舍五入, ceil - 向上取整, floor - 向下取整 */
type ConvertAccurancyType = 'round' | 'ceil' | 'floor';

/** 数据面板的 UI 信息 */
export interface CustomDataUi {
  label: string;
  /** 数据生成方式 */
  dataGenerateType: DataGenerateType;
}

/** 当用户选择静态数据后，静态数据的详细配置 */
export interface CustomDataStaticDetail {
  uiType: PropertyUiType;
  /** 用户选择了静态数据后，填充的默认值 */
  defaultValue?: any;
  /** 对于数值类型的静态数据设置单步大小 */
  step?: number;
}

export interface NumberAccuracyProperty {
  /** 数据显示精度，不设置则不进行精度转换 */
  displayAccurancy?: number;
  /** 精度转换类型 */
  convertAccurancyType?: ConvertAccurancyType;
}

/** 当用户选择随机生成数据后的详细配置 */
export interface CustomDataRandomDetail extends NumberAccuracyProperty {
  /** 随机数产生的最小值 */
  min: number;
  /** 随机数产生的最大值 */
  max: number;
}

/** 当用户选择脚本生成数据后的详细配置 */
export interface CustomDataScriptDetail extends NumberAccuracyProperty {}
