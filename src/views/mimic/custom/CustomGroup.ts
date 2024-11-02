import { customGroupGenerate, type GroupCustomCfg } from './generator';

const cfg: GroupCustomCfg = {
  tag: 'testGroup',
};

customGroupGenerate(cfg);
