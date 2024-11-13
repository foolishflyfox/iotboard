export const editorTypeName = {
  display: '图纸',
  module: '模块',
  component: '组件',
};

export const componentTypeName = {
  code: '代码组件',
  graph: '图形组件',
};

export type EditorType = keyof typeof editorTypeName;

export type ComponentType = keyof typeof componentTypeName;

export interface OpenedTarget {
  editorType: EditorType;
  path: string;
}
