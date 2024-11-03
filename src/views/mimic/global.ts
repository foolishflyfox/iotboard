import type { App } from 'leafer-ui';
import type { CustomMeta } from './utils';

interface MimicVar {
  app?: App;
  draggingCustomMeta?: CustomMeta;
  componentEditor: {
    app?: App;
    draggingTag?: string;
  };
}

export const mimicVar: MimicVar = {
  componentEditor: {},
};
