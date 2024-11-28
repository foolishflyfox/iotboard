export const editorTypeName = {
  display: '图纸',
  module: '模块',
  component: '组件',
  asset: '资源',
};

export type EditorType = keyof typeof editorTypeName;

export interface OpenedTarget {
  editorType: EditorType;
  path: string;
}
