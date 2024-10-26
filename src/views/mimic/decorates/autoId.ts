import { isEmpty } from 'lodash-es';
import { getUniqueId } from '@mimic/utils/common-utils';

export function autoId() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      declare id: string;
      constructor(...args: any[]) {
        super(...args);
        if (isEmpty(this.id)) {
          this.id = getUniqueId();
        }
      }
    };
  };
}
