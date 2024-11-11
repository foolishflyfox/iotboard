import type { UiCustomCfg } from './custom-ui';

export type CustomCfgDict = {
  ui: Record<string, UiCustomCfg>;
};

export const customCfgDict: CustomCfgDict = {
  ui: {},
};
