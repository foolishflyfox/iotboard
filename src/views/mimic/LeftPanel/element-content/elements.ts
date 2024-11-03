import { type CustomDragIcon } from '@mimic/types';

type ElementCategories = Record<
  string,
  {
    label: string;
    elements: CustomDragIcon[];
  }
>;

const baseElements: Omit<CustomDragIcon, 'type'>[] = [{ path: 'rect', label: '矩形' }];
export const elementCategories: ElementCategories = {};
elementCategories.base = {
  label: '基础',
  elements: baseElements.map(e => ({ type: 'element', ...e })),
};
