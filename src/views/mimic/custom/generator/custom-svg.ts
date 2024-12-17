import { dataProcessor, Image, ImageData, registerUI } from 'leafer-ui';
import type { CustomPropertyCfgs, UiCustomCfg } from './custom-ui';
import { autoId } from '../../decorates';

export function customSvgGenerate(customCfg: UiCustomCfg) {
  class InnerData extends ImageData {}

  @registerUI()
  @autoId()
  class InnerCustom extends Image {
    static appearanceTypes = customCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return customCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: any;

    constructor(data: any) {
      super({
        ...data
      });
      // 解决第一次直接通过输入修改 width/hight 时，同步修改宽高的问题
      setTimeout(() => {
        const w = this.width;
        const h = this.height;
        this.width = w;
        this.height = h;
      }, 500);
    }
  }

  let id = 1;
  const customCfgs: CustomPropertyCfgs = [
    {
      id: id++,
      group: '编辑',
      name: 'svgColor',
      label: '',
      type: 'svgColorEditor',
      variable: true,
    },
  ];
  return customCfgs;
}
