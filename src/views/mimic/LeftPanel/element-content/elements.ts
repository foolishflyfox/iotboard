import { type CustomDragIcon } from '@mimic/types';

type ElementCategories = Record<
  string,
  {
    label: string;
    elements: CustomDragIcon[];
  }
>;

export const elementCategories: ElementCategories = {
  base: {
    label: '基础',
    elements: [
      {
        tag: 'rect',
        label: '矩形',
      },
    ],
  },
};
