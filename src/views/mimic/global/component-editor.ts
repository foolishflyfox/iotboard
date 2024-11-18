import { UI, type App } from 'leafer-ui';
import { getUiClassByTag } from '../utils';
import { registerElement } from '@mimic/custom/registrar';

export class ComponentEditor {
  app?: App;
  draggingTag?: string;

  getUiClass(tag: string): typeof UI {
    if (!getUiClassByTag(tag)) {
      registerElement(tag);
    }
    const uiClass: typeof UI = getUiClassByTag(tag);
    return uiClass;
  }

  loadComponent(tag: string) {
    registerElement;
  }
}
