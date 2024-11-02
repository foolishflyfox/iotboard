import { mimicVar } from '../global';
import * as _ from 'lodash-es';

export const componentEditorUtils = {
  viewAutoFit() {
    const { app } = mimicVar.componentEditor;
    if (app && !_.isEmpty(app.tree.children)) {
      app.tree.zoom('fit', 23);
    }
  },
};
