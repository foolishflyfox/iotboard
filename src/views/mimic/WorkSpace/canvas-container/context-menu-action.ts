import type { IClientPointData, IUI } from 'leafer-editor';
import * as _ from 'lodash-es';
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';
import { mimicVar } from '@mimic/global';
import { displayBaseMapId } from '@mimic/constant';
import { uiStorage } from '@/utils/local-storage-manager';
import { getElementClassByTag, registerUiClass } from '@mimic/custom/registrar';
import { getUniqueId } from '@/utils';

function judgeCurUiTypeHelper() {
  const mimicDisplayStatus = useMimicDisplayStatus();
  const curUi = mimicDisplayStatus.curUi;
  const noTargetHandler = (handler: () => void) => {
    if (_.isArray(curUi)) return;
    if (_.isNil(curUi) || curUi.id === displayBaseMapId) {
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

export function doContextMenuAction(action: string, clientPointData?: IClientPointData) {
  const mimicDisplayStatus = useMimicDisplayStatus();
  const { noTargetHandler, singleTargetHandler, multiTargetHandler } = judgeCurUiTypeHelper();
  if (mimicDisplayStatus.contextMenuItemDisabled[action]) {
    return;
  }
  if (action === 'png' || action === 'jpg') {
    singleTargetHandler(ui => exportImage(ui, action));
  } else if (action === 'delete') {
    const singleTargetDelete = (ui: IUI) => {
      if (ui.id !== displayBaseMapId) {
        ui.destroy();
        mimicDisplayStatus.selectBaseMap();
        mimicVar.displayEditor.app?.editor?.cancel();
        const mimicWorkspaceStatus = useMimicWorkspaceStatus();
        mimicWorkspaceStatus.setCurrentDisplayUnsave();
      }
    };
    singleTargetHandler(singleTargetDelete);
    multiTargetHandler((uis) => {
      for (const ui of uis) {
        singleTargetDelete(ui);
      }
    });
  } else if (action === 'copy') {
    singleTargetHandler((ui) => {
      const uiJson = ui.toJSON();
      uiStorage.saveUi(uiJson);
    });
  } else if (action === 'paste') {
    noTargetHandler(async () => {
      const uiJson = uiStorage.getUi();
      if (uiJson) {
        let pagePoint = { x: 0, y: 0 };
        if (clientPointData && mimicVar.displayEditor.app) {
          pagePoint = mimicVar.displayEditor.app.getPagePointByClient(clientPointData);
        }
        uiJson.x = pagePoint.x;
        uiJson.y = pagePoint.y;
        if (uiJson.tag.startsWith('element:')) {
          uiJson.id = getUniqueId();
          const elementClass = getElementClassByTag(uiJson.tag);
          const element = new elementClass(uiJson);
          // nextTick(() => {
          mimicVar.displayEditor.app?.tree.add(element);
          // });
        } else {
          const componentClass = await registerUiClass(uiJson.tag);
          const component = new componentClass(uiJson);
          nextTick(() => {
            mimicVar.displayEditor.app?.tree.add(component);
          });
        }
      }
    });
  }
}

export async function exportImage(component: IUI, type: 'png' | 'jpg') {
  // console.log('导出图片文件', `${component.tag}.${type}`);
  const imageName = `${component.tag}.${type}`;
  const exportResult = await component.export(imageName);
  // window.$message?.success(`图片 ${imageName} 导出成功`);
}
