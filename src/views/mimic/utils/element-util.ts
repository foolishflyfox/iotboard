import * as _ from 'lodash-es';
import { mimicVar } from '@mimic/global';

/** 页面自适应 */
export function viewAutoFit() {
  if (mimicVar.app) {
    mimicVar.app.tree.zoom('fit', 23);
  }
}

/** 根据元素 id 查询 UI 对象 */
export function findUiById(id?: null | string | string[]) {
  if (_.isNil(id)) return null;
  if (_.isArray(id)) {
    // 遍历
    return id.map(id => mimicVar.app!.tree.findId(id));
  }
  return mimicVar.app?.tree.findId(id);
}
