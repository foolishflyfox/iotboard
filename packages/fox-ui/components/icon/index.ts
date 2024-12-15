import { Platform } from 'leafer-ui';
import { Component } from '@foxui/utils';
import type { FoxIconProps } from './types';
import type { IFlowInputData } from '@leafer-ui/interface';

export function isSvg(value: string) {
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  return /<svg.*?>.*?<\/svg>/.test(value);
}

export function fillSvg(value: string, color?: string) {
  if (!isSvg(value) || !color) {
    return value;
  }
  if (/fill=".*?"/.test(value)) {
    return value.replace(/fill=".*?"/g, `fill="${color}"`);
  }
  return value.replace(/<svg /g, `<svg fill="${color}" `);
}

export class FoxIcon extends Component<FoxIconProps> {
  timer: ReturnType<typeof setInterval> | null = null;

  constructor(props: FoxIconProps, data?: IFlowInputData) {
    super(props, data);
  }

  public get __tag() {
    return 'ElIcon';
  }

  render() {
    const { icon = '', color, size, loading } = this.props;

    this.set({
      flow: false,
      width: size,
      height: size,
      visible: !!icon || 0,
      children: [
        {
          tag: 'Rect',
          fill: {
            type: 'image',
            url: isSvg(icon) ? Platform.toURL(fillSvg(icon, color), 'svg') : icon,
            mode: 'fit',
          },
          width: size,
          height: size,
        },
      ],
    });

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (loading) {
      this.timer = setInterval(() => {
        this.children[0].rotateOf('center', 3);
      }, 16.7);
    }
  }
}
