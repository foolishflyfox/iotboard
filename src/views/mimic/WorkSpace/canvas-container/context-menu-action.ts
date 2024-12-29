import type { IUI, UI } from 'leafer-ui';
import * as _ from 'lodash-es';
import { useMimicDisplayStatus, useMimicWorkspaceStatus } from '@mimic/stores';
import { mimicVar } from '@mimic/global';
import { displayBaseMapId } from '@mimic/constant';

export function doContextMenuAction(action: string) {
  const mimicDisplayStatus = useMimicDisplayStatus();
  const curUi = mimicDisplayStatus.curUi;

  if (action === 'png' || action === 'jpg') {
    if (_.isNil(curUi)) {
      console.error('未选中元素，不允许导出图片');
    } else if (_.isArray(curUi)) {
      console.error('选中多个元素，不允许导出图片');
    } else {
      exportImage(curUi as UI, action);
    }
  } else if (action === 'delete') {
    if (_.isNil(curUi)) {
    } else if (_.isArray(curUi)) {
    } else {
      const iui = curUi as IUI;
      if (iui.id !== displayBaseMapId) {
        iui.destroy();
        mimicDisplayStatus.selectBaseMap();
        mimicVar.displayEditor.app?.editor?.cancel();
        const mimicWorkspaceStatus = useMimicWorkspaceStatus();
        mimicWorkspaceStatus.setCurrentDisplayUnsave();
      }
    }
  }
}

export async function exportImage(component: IUI, type: 'png' | 'jpg') {
  // console.log('导出图片文件', `${component.tag}.${type}`);
  const imageName = `${component.tag}.${type}`;
  const exportResult = await component.export(imageName);
  // window.$message?.success(`图片 ${imageName} 导出成功`);
}
