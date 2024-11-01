import {
  boundsType,
  dataProcessor,
  registerUI,
  UI,
  UIData,
  type ILeaferCanvas,
  type IRadiusPointData,
} from 'leafer-ui';
import * as _ from 'lodash-es';
import { autoId } from '@mimic/decorates';
import { getCommonAppearancePropertyTypes, type AppearanceType } from '../types';

export type Setter = (v: any) => void;
export interface CustomPropertyCfg {
  setter?: Setter;
  defaultValue?: any;
}
export type CustomPropertyCfgs = Record<string, CustomPropertyCfg>;

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
  excludeAppearances?: AppearanceType[];
  /** 外观初始化值 */
  defaultAppearanceValues?: Record<AppearanceType, any>;
  // 如果通过width、height属性无法确定图形 bounds，则定义该函数
  updateBoxBounds?: () => void;
  // 绘制碰撞路径
  drawHitPath?: (hitCanvas: ILeaferCanvas) => void;
  // 碰撞检测
  hit?: (inner: IRadiusPointData) => boolean;
  draw: (canvas: ILeaferCanvas) => void;
}

export function uiGenerateCustom(uiCustomCfg: UiCustomCfg) {
  class InnerData extends UIData {}
  if (!_.isNil(uiCustomCfg.customPropertyCfgs)) {
    for (const fieldName of _.keys(uiCustomCfg.customPropertyCfgs)) {
      const setter = uiCustomCfg.customPropertyCfgs[fieldName]?.setter;
      if (setter) {
        const setterName = _.camelCase(`set ${fieldName}`);
        (InnerData as any).prototype[setterName] = setter;
      }
    }
  }

  @registerUI()
  @autoId()
  class InnerCustom extends UI {
    static appearancePropertyTypes = getCommonAppearancePropertyTypes(
      uiCustomCfg.excludeAppearances || [],
    );
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
  if (!_.isNil(uiCustomCfg.customPropertyCfgs)) {
    for (const fieldName of _.keys(uiCustomCfg.customPropertyCfgs)) {
      const defaultValue = uiCustomCfg.customPropertyCfgs[fieldName]?.defaultValue;
      if (defaultValue !== undefined) {
        boundsType(defaultValue)(InnerCustom.prototype, fieldName);
      }
    }
  }
}
