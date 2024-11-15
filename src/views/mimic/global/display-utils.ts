import type { DisplayData } from '@mimic/types';
import { PropertyEvent, Rect, type App } from 'leafer-ui';
import { displayBaseMapId } from '@mimic/constant';
import { viewAutoFit } from '@mimic/utils';

export function loadDisplayData(app: App, data: DisplayData) {
  const { width, height, backgroundColor } = data.baseMap;
  const displayBaseMap = new Rect({
    id: displayBaseMapId,
    width,
    height,
    fill: backgroundColor,
    data: {
      sizeType: 'custom',
    },
    event: {
      [PropertyEvent.CHANGE]: (v: PropertyEvent) => {
        if (v.attrName === 'width' || v.attrName === 'height') {
          nextTick(viewAutoFit);
        }
      },
    },
  });
  app.tree.add(displayBaseMap);
  viewAutoFit();
  console.log('todo: 在图纸编辑器上渲染图纸数据', data);
}
