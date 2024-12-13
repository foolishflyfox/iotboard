import type { BaseCustomCfg } from '@mimic/types';
import {
  dataProcessor,
  Line,
  LineData,
  registerUI,
  surfaceType,
  type ILineData,
  type ILineInputData,
} from 'leafer-ui';
import { autoId } from '@mimic/decorates';
import type { CustomPropertyCfgs } from './custom-ui';

export interface LineCustomCfg extends BaseCustomCfg {}

const FLOW_SPEED_MAX = 10;

export function customLineGenerate(lineCustomCfg: LineCustomCfg) {
  interface CustomData {
    /** 线条在虚线模式下的，0 表示无流动
     * 正数表示从起始点流向结束点，负数表示从结束点流向起始点
     * 值表示流动速度，绝对值越大，流动速度越快 */
    flowSpeed?: number;
  }

  interface ICustomLineInputData extends ILineInputData, CustomData {}
  interface ICustomLineData extends ILineData, CustomData {}

  class InnerData extends LineData implements ICustomLineData {
    protected _flowSpeed?: number;

    private innerDashOffset: number = 0;
    private currentTick = 0;

    private renderFlow() {
      if (this._flowSpeed) {
        this.currentTick += this._flowSpeed < 0 ? -1 : 1;
        if (this.currentTick < -1 * FLOW_SPEED_MAX) {
          this.innerDashOffset += 1;
          this.currentTick = this._flowSpeed;
          this.__leaf.dashOffset = this.innerDashOffset;
        } else if (this.currentTick > FLOW_SPEED_MAX) {
          this.innerDashOffset -= 1;
          this.currentTick = this._flowSpeed;
          this.__leaf.dashOffset = this.innerDashOffset;
        }
        this.__leaf.nextRender(this.renderFlow, this);
      }
    }

    protected setFlowSpeed(v: number) {
      this._flowSpeed = v;
      // this.__leaf.nextRender
      this.__leaf.removeNextRender(this.renderFlow);
      if (v) {
        this.currentTick = this._flowSpeed;
        this.__leaf.nextRender(this.renderFlow, this);
      } else {
        this.currentTick = 0;
      }
    }
  }

  @registerUI()
  @autoId()
  class InnerCustom extends Line {
    static appearanceTypes = lineCustomCfg.appearanceTypes || ['x', 'y', 'width', 'height'];

    public get __tag() {
      return lineCustomCfg.tag;
    }

    @dataProcessor(InnerData)
    declare public __: any;

    @surfaceType()
    declare public flowSpeed: number;

    constructor(data: ICustomLineInputData) {
      const flowSpeed = 0;
      super({
        strokeWidth: 5,
        stroke: {
          type: 'solid',
          color: '#000000',
        },
        startArrow: 'circle',
        endArrow: 'arrow',
        cornerRadius: 0,
        flowSpeed,
        ...data,
      });
      this.flowSpeed = flowSpeed;
    }
  }

  let id = 1;
  const customCfgs: CustomPropertyCfgs = [
    {
      id: id++,
      group: '动画',
      name: 'flowSpeed',
      label: '流动速率',
      type: 'number',
      variable: true,
      extra: {
        min: -10,
        max: 10,
      },
    },
  ];
  return customCfgs;
}
