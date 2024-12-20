import { mimicVar } from '@mimic/global';

export function layoutAfterHandler() {
  if (mimicVar.displayEditor.app) {
    mimicVar.displayEditor.app.sky.setTransform(
      { ...mimicVar.displayEditor.app.tree.localTransform }
    );
  } else {
    console.error('绑定 layoutAfterHandler 处理函数时 app 未定义');
  }
}
