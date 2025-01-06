import type { App } from 'leafer-editor';
import { registerUiClass } from '@mimic/custom/registrar';

export class ComponentEditor {
  app?: App;
  draggingTag?: string;

  viewAutoFit() {
    this.app?.tree?.zoom('fit', 50);
  }

  async loadComponent(tag: string) {
    const componentClass = await registerUiClass(tag);
    const newComponent = new componentClass({
      x: 0,
      y: 0,
      draggable: false,
      editable: false,
    });
    this.app?.tree.clear();
    this.app?.tree.add(newComponent);
    this.viewAutoFit();
  }
}
