import {
  dataProcessor,
  Line,
  LineData,
  registerUI,
  surfaceType,
  type ILineData,
  type ILineInputData,
} from 'leafer-editor';
import { autoId } from '@mimic/decorates';
import type { CustomPropertyCfgs, UiCustomCfg } from './custom-ui';

const FLOW_SPEED_MAX = 5;

export function customLineGenerate(lineCustomCfg: UiCustomCfg) {
  interface CustomData {
    /**
     * 线条在虚线模式下的，0 表示无流动
     * 正数表示从起始点流向结束点，负数表示从结束点流向起始点
     * 值表示流动速度，绝对值越大，流动速度越快
     */
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
        const t = this.currentTick;
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
        // window.setTimeout(this.renderFlow, 1000);
      }
    }

    protected setFlowSpeed(v: number) {
      this.__leaf.removeNextRender(this.renderFlow);
      this._flowSpeed = 0;
      setTimeout(() => {
        this._flowSpeed = v;
        if (v) {
          this.currentTick = this._flowSpeed;
          this.__leaf.nextRender(this.renderFlow, this);
        } else {
          this.currentTick = 0;
        }
      }, 500);
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
        strokeJoin: 'round',
        // startArrow: 'circle',
        // endArrow: 'arrow',
        startArrow: 'none',
        endArrow: 'none',
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
        min: -1 * FLOW_SPEED_MAX,
        max: FLOW_SPEED_MAX,
        step: 1,
      },
    },
  ];
  return customCfgs;
}
