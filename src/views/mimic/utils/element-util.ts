import * as _ from 'lodash-es';
import { mimicVar } from '@mimic/global';

export function findUiById(id?: null | string | string[]) {
  if (_.isNil(id)) return null;
  if (_.isArray(id)) {
    // 遍历
    return id.map(id => mimicVar.app!.tree.findId(id));
  }
  return mimicVar.app?.tree.findId(id);
}
