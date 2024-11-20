// import { componentEditorUtils } from '@mimic/utils';
import type { IUI } from 'leafer-ui';

export function doComponentEditorAction(action: string) {
  if (action === 'png' || action === 'jpg') {
    // const selectedElements = componentEditorUtils.getCurrentSelectedElements();
    const selectedElements: IUI[] = [];
    if (selectedElements.length === 1) {
      const element = selectedElements[0];
      console.log('tag =', element.tag);
      let elementName = element.tag;
      if (elementName.includes(':')) {
        elementName = elementName.split(':')[1];
      }
      const imageName = `${elementName}.${action}`;
      element.export(imageName);
    }
  }
}
