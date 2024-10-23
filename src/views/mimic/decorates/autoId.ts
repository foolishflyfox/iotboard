import { isEmpty } from 'lodash-es';

export function autoId() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    console.log('###1');
    return class extends constructor {
      declare id: string;
      constructor(...args: any[]) {
        console.log('###2');
        super(...args);
        if (isEmpty(this.id)) {
          console.log('###3');
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
