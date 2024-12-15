import { isEmpty } from 'lodash-es';
import { getUniqueId } from '@/utils';

export function autoId() {
  // eslint-disable-next-line ts/no-empty-object-type
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
