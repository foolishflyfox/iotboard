import type { IUI } from 'leafer-ui';
import { findCurrentSelected } from '@mimic/utils';
import * as _ from 'lodash-es';

export function doContextMenuAction(action: string) {
  const ui = findCurrentSelected();
  if (action === 'png' || action === 'jpg') {
    if (_.isNil(ui)) {
      console.error('未选中元素，不允许导出图片');
    } else if (_.isArray(ui)) {
      console.error('选中多个元素，不允许导出图片');
    } else {
      exportImage(ui, action);
    }
  }
}

export async function exportImage(component: IUI, type: 'png' | 'jpg') {
  // console.log('导出图片文件', `${component.tag}.${type}`);
  const imageName = `${component.tag}.${type}`;
  const exportResult = await component.export(imageName);
  // window.$message?.success(`图片 ${imageName} 导出成功`);
}