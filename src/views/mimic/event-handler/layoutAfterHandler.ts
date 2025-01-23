import { mimicVar } from '@mimic/global';

export function layoutAfterHandler() {
  if (mimicVar.canvasEditor.app) {
    mimicVar.canvasEditor.app.sky.setTransform(
      { ...mimicVar.canvasEditor.app.tree.localTransform }
    );
  } else {
    console.error('绑定 layoutAfterHandler 处理函数时 app 未定义');
  }
}
