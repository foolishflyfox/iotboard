import {
  // boundsType,
  dataProcessor,
  registerUI,
  surfaceType,
  // dataType,
  UI,
  UIData,
  type ILeaferCanvas,
  type IRadiusPointData,
} from 'leafer-ui';
import * as _ from 'lodash-es';
import { autoId } from '@mimic/decorates';
import { type AppearanceType } from '@mimic/types';

export type Setter = (v: any) => void;
export interface CustomPropertyCfg {
  id: string;
  name: string;
  label: string;
  /** 配置项是否可变，即是否可以由用户配置或由外部动态改变 */
  variable: boolean;
  type: string;
  defaultValue?: any;
  group?: string;
  setter?: Setter;
}
// export type CustomPropertyCfgs = Record<string, CustomPropertyCfg>;
export type CustomPropertyCfgs = CustomPropertyCfg[];
/** 根据 group 字段进行分组 */
export function groupCustomPropertyCfgs(cfgs: CustomPropertyCfgs) {
  const result: Record<string, CustomPropertyCfgs> = {};
  for (const cfg of cfgs || []) {
    const group = cfg.group || '';
    if (!result[group]) result[group] = [];
    result[group].push(cfg);
  }
  return result;
}
export type DefaultAppearanceValues = { [k in AppearanceType]?: any };
// const setters = {
//   setValue: function (v: any) {
//     console.log('@@@### setValue');
//     (this as any)._value = v;
//   },
// };
export interface UiCustomCfg {
  /** 自定义组件名 */
  tag: string;
  /** 为自定义属性赋值时执行的自定义操作 */
  customPropertyCfgs?: CustomPropertyCfgs;
  /** 不希望编辑器用户修改的外观属性 */
  includeAppearances?: AppearanceType[];
  /** 外观初始化值 */
  defaultAppearanceValues?: DefaultAppearanceValues;
  // 如果通过width、height属性无法确定图形 bounds，则定义该函数
  updateBoxBounds?: () => void;
  // 绘制碰撞路径
  drawHitPath?: (hitCanvas: ILeaferCanvas) => void;
  // 碰撞检测
  hit?: (inner: IRadiusPointData) => boolean;
  // 绘制函数
  draw: (canvas: ILeaferCanvas) => void;
  // 自定义外观属性
  appearanceTypes?: AppearanceType[];
}

export function customUiGenerate(uiCustomCfg: UiCustomCfg) {
  class InnerData extends UIData {}
  if (!_.isEmpty(uiCustomCfg.customPropertyCfgs)) {
    for (const propertyCfg of uiCustomCfg.customPropertyCfgs!) {
      const setter = propertyCfg.setter;
      if (setter) {
        const setterName = _.camelCase(`set ${propertyCfg.name}`);
        (InnerData as any).prototype[setterName] = setter;
      }
    }
  }

  @registerUI()
  @autoId()
  class InnerCustom extends UI {
    static appearanceTypes = uiCustomCfg.includeAppearances || ['x', 'y', 'width', 'height'];
    public get __tag() {
      return uiCustomCfg.tag;
    }
    @dataProcessor(InnerData)
    public declare __: any;

    constructor(data: any) {
      if (!_.isNil(uiCustomCfg.defaultAppearanceValues)) {
        for (const k of _.keys(uiCustomCfg.defaultAppearanceValues)) {
          data[k] = data[k] ?? uiCustomCfg.defaultAppearanceValues[k as AppearanceType];
        }
      }
      super(data);
    }
  }

  if (uiCustomCfg.updateBoxBounds) {
    InnerCustom.prototype.__updateBoxBounds = uiCustomCfg.updateBoxBounds;
  }

  if (uiCustomCfg.drawHitPath) {
    InnerCustom.prototype.__drawHitPath = uiCustomCfg.drawHitPath;
  }

  if (uiCustomCfg.hit) {
    InnerCustom.prototype.__hit = uiCustomCfg.hit;
  }

  InnerCustom.prototype.__draw = uiCustomCfg.draw;

  // 设置自定义属性的初始化值
  if (!_.isEmpty(uiCustomCfg.customPropertyCfgs)) {
    for (const propertyCfg of uiCustomCfg.customPropertyCfgs!) {
      const defaultValue = propertyCfg.defaultValue;
      if (defaultValue !== undefined) {
        surfaceType(defaultValue)(InnerCustom.prototype, propertyCfg.name);
      }
    }
  }
}
