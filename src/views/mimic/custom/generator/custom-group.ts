import { dataProcessor, Ellipse, Group, GroupData, Rect, registerUI } from 'leafer-ui';
import { autoId } from '@mimic/decorates';
import { type BaseCustomCfg } from '@mimic/types';

export interface GroupCustomCfg extends BaseCustomCfg {}

export function customGroupGenerate(groupCustomCfg: GroupCustomCfg) {
  class InnerData extends GroupData {}

  @registerUI()
  @autoId()
  class InnerCustom extends Group {
    static appearanceTypes = groupCustomCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return groupCustomCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: any;

    constructor(data: any) {
      super(data);
      this.add(new Rect({ x: 0, y: 0, width: 100, height: 100, fill: 'pink' }));
      this.add(
        new Ellipse({ x: 0, y: 0, width: 100, height: 100, fill: 'orange', around: 'center' }),
      );
    }
  }
}
