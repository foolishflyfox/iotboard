import type { UiCustomCfg } from './custom-ui';
import * as _ from 'lodash-es';

export class CustomCfgService {
  private cfgDict: Record<string, UiCustomCfg>;
  constructor() {
    this.cfgDict = {};
  }

  addUiCustomCfg(tag: string, cfg: UiCustomCfg) {
    console.log(`${tag} add cfg:`, cfg);
    if (cfg && !_.isEmpty(tag)) {
      this.cfgDict[tag] = cfg;
    }
  }

  getUiCustomCfg(tag: string | undefined) {
    if (tag) {
      return this.cfgDict[tag];
    }
  }
}

export const customCfgService = new CustomCfgService();
