import { mimicVar } from '../global';
import * as _ from 'lodash-es';
import { useMimicComponentStatus } from '@mimic/stores';
import type { IUI } from 'leafer-ui';

export const componentEditorUtils = {
  viewAutoFit() {
    const { app } = mimicVar.componentEditor;
    if (app && !_.isEmpty(app.tree.children)) {
      app.tree.zoom('fit', 23);
    }
  },
  getCurrentSelectedElements() {
    const mimicComponentStatus = useMimicComponentStatus();
    const selectedUiIds = mimicComponentStatus.selectedUiIds;
    const selectedUis = selectedUiIds.map(
      uiId => mimicVar.componentEditor.app?.tree.findId(uiId) as IUI,
    );
    return selectedUis;
  },
};
