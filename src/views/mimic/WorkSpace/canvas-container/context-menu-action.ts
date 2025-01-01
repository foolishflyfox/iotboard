import type { IUI } from 'leafer-ui';
import * as _ from 'lodash-es';
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';
import { mimicVar } from '@mimic/global';
import { displayBaseMapId } from '@mimic/constant';

function judgeCurUiTypeHelper() {
  const mimicDisplayStatus = useMimicDisplayStatus();
  const curUi = mimicDisplayStatus.curUi;
  const noTargetHandler = (handler: () => void) => {
    if (_.isNil(curUi)) {
      handler();
    }
  };
  const multiTargetHandler = (handler: (uis: IUI[]) => void) => {
    if (_.isArray(curUi)) {
      handler(curUi as IUI[]);
    }
  };
  const singleTargetHandler = (handler: (ui: IUI) => void) => {
    if (!_.isNil(curUi) && !_.isArray(curUi)) {
      handler(curUi as IUI);
    }
  };
  return { noTargetHandler, singleTargetHandler, multiTargetHandler };
}

export function doContextMenuAction(action: string) {
  const mimicDisplayStatus = useMimicDisplayStatus();
  const { noTargetHandler, singleTargetHandler, multiTargetHandler } = judgeCurUiTypeHelper();
  if (mimicDisplayStatus.contextMenuItemDisabled[action]) {
    return;
  }
  if (action === 'png' || action === 'jpg') {
    singleTargetHandler(ui => exportImage(ui, action));
  } else if (action === 'delete') {
    singleTargetHandler((ui) => {
      if (ui.id !== displayBaseMapId) {
        ui.destroy();
        mimicDisplayStatus.selectBaseMap();
        mimicVar.displayEditor.app?.editor?.cancel();
        const mimicWorkspaceStatus = useMimicWorkspaceStatus();
        mimicWorkspaceStatus.setCurrentDisplayUnsave();
      }
    });
  } else if (action === 'copy') {
    singleTargetHandler((ui) => {
      console.log('copy', ui.toJSON());
    });
  }
}

export async function exportImage(component: IUI, type: 'png' | 'jpg') {
  // console.log('导出图片文件', `${component.tag}.${type}`);
  const imageName = `${component.tag}.${type}`;
  const exportResult = await component.export(imageName);
  // window.$message?.success(`图片 ${imageName} 导出成功`);
}
