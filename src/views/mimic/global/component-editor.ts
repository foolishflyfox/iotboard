import { UI, type App } from 'leafer-ui';
import { registerUiClass } from '@mimic/custom/registrar';

export class ComponentEditor {
  app?: App;
  draggingTag?: string;

  viewAutoFit() {
    this.app?.tree?.zoom('fit', 23);
  }

  async loadComponent(tag: string) {
    const componentClass = await registerUiClass(tag);
    const newComponent = new componentClass({
      x: 0,
      y: 0,
      draggable: false,
      editable: true,
    });
    this.app?.tree.add(newComponent);
    this.viewAutoFit();
  }
}
