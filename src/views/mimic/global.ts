import type { App } from 'leafer-ui';
import type { CustomMeta } from './utils';

interface MimicVar {
  app?: App;
  draggingCustomMeta?: CustomMeta;
  componentEditor: {
    app?: App;
  };
}

export const mimicVar: MimicVar = {
  componentEditor: {},
};
