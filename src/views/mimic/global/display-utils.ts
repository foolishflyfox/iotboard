import type { DisplayData } from '@mimic/types';
import { ChildEvent, PropertyEvent, Rect, type App } from 'leafer-ui';
import { displayBaseMapId } from '@mimic/constant';
import { viewAutoFit } from '@mimic/utils';
import { useMimicDisplayStatus } from '@mimic/stores';

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
      [ChildEvent.MOUNTED]: () => {
        const mimicDisplayStatus = useMimicDisplayStatus();
        mimicDisplayStatus.selectBaseMap();
      },
    },
  });
  app.tree.add(displayBaseMap);

  viewAutoFit();
}
