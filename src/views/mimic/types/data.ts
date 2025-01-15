/**
 * false: 不隐藏绑定图标
 * true: 隐藏绑定图标，但有图标占位空间
 * { hide: undefined } / { hide: false }: 隐藏绑定图标，但有图标占位空间
 * { hide: true }: 隐藏绑定图标，无图标占位空间
 */
export type Unbindable = boolean | { hide?: boolean };
