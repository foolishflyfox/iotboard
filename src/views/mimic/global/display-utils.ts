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
  app.tree.clear();
  app.tree.add(displayBaseMap);

  viewAutoFit();
}

export function generateDisplayData(app: App) {
  if (!app?.tree) return null;
  const allUi = app?.tree.find(() => 1);
  const displayData: DisplayData = { baseMap: {} } as any;
  for (const ui of allUi) {
    if (ui.id === displayBaseMapId) {
      const baseMap = displayData.baseMap;
      baseMap.backgroundColor = ui.fill as string;
      baseMap.width = ui.width!;
      baseMap.height = ui.height!;
      baseMap.sizeType = ui.data?.sizeType;
      console.log('保存图纸信息: ', baseMap);
    }
  }
  return displayData;
}
