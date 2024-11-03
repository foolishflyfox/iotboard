import { customRectGenerate, customEllipseGenerate } from '@mimic/custom/generator';

export const elementRegistrar: Record<string, () => void> = {
  'element:rect': () => customRectGenerate({ tag: 'element:rect' }),
  'element:ellipse': () => customEllipseGenerate({ tag: 'element:ellipse' }),
};

export function registerElement(tag: string) {
  const registerHandler = elementRegistrar[tag];
  if (!registerHandler) {
    throw new Error(`不存在元素 tag 为 ${tag} 的注册处理函数`);
  } else {
    registerHandler();
  }
}
