import type { CustomDragIcon } from '@mimic/types';

type ElementCategories = Record<
  string,
  {
    label: string;
    elements: CustomDragIcon[];
  }
>;

export const elementCategories: ElementCategories = {};

const baseElements: Omit<CustomDragIcon, 'type'>[] = [
  { path: 'rect', label: '矩形' },
  { path: 'ellipse', label: '椭圆' },
  { path: 'regular-polygon', label: '正多边形' },
  { path: 'text', label: '纯文本' },
  { path: 'textbox', label: '边框文本' },
];

elementCategories.base = {
  label: '基础',
  elements: baseElements.map(e => ({ type: 'element', ...e })),
};

const htmlElements: Omit<CustomDragIcon, 'type'>[] = [
  { path: 'button', label: '按钮' },
  // { path: 'html', label: '自定义' }
];

elementCategories.html = {
  label: '页面元素',
  elements: htmlElements.map(e => ({ type: 'element', ...e }))
};
