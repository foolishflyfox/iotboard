import type { UiCustomCfg } from './custom-ui';
import * as _ from 'lodash-es';

export class CustomCfgService {
  private cfgDict: Record<string, UiCustomCfg>;
  constructor() {
    this.cfgDict = {};
  }
  addUiCustomCfg(tag: string, cfg: UiCustomCfg) {
    if (cfg && _.isEmpty(tag)) {
      this.cfgDict[tag] = cfg;
    }
  }
  getUiCustomCfg(tag: string) {
    return this.cfgDict[tag];
  }
}

export const customCfgService = new CustomCfgService();
