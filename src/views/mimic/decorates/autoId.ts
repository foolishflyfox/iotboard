import { isEmpty } from 'lodash-es';

export function autoId() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      declare id: string;
      constructor(...args: any[]) {
        super(...args);
        if (isEmpty(this.id)) {
          const rt = 1000;
          this.id = (
            Date.now() * rt +
            Math.floor(Math.random() * rt)
          ).toString();
        }
      }
    };
  };
}
