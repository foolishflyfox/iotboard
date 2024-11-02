import { customRectGenerate } from '@mimic/custom/generator';

export const elementRegistrar = {
  'element:rect': () => customRectGenerate({ tag: 'element:rect' }),
};
