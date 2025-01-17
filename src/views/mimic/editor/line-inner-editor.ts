import {
  Box,
  DragEvent,
  Editor,
  InnerEditor,
  Line,
  PointerEvent,
  registerInnerEditor,
  type IPointData
} from 'leafer-editor';
import '@leafer-in/state';

export const LineInnerEditorTag = 'LineInnerEditor';

@registerInnerEditor() // 1. 注册内部编辑器
export class LineInnerEditor extends InnerEditor {
  public get tag() {
    return LineInnerEditorTag; // 2. 定义全局唯一的 tag 名称
  }

  // 控制点
  public points: Box[];

  constructor(editor: Editor) {
    super(editor);
    this.points = [];
  }

  public onLoad(): void {
    this.editBox.add(this.view);
  }

  public onUpdate(): void {
    const { scaleX, scaleY } = this.editBox.app.tree!;
    const curLine = this.editor.element as Line;
    const pointDatas = curLine.points as IPointData[];
    let i = 0;
    let minX = pointDatas[0].x;
    let minY = pointDatas[0].y;
    for (let j = 1; j < pointDatas.length; ++j) {
      minX = Math.min(minX, pointDatas[j].x);
      minY = Math.min(minY, pointDatas[j].y);
    }
    for (; i < this.points.length && i < pointDatas.length; i++) {
      this.points[i].set({
        x: (pointDatas[i].x - minX) * scaleX!,
        y: (pointDatas[i].y - minY) * scaleY!
      });
    }
    if (i < pointDatas.length) {
      // 点数增多
      for (; i < pointDatas.length; i++) {
        const point = new Box({
          ...this.editBox.getPointStyle(),
          strokeWidth: 1,
          x: (pointDatas[i].x - minX) * scaleX!,
          y: (pointDatas[i].y - minY) * scaleY!,
          hoverStyle: {
            fill: 'red'
          },
          event: {
            [DragEvent.DRAG]: (e: DragEvent) => {
              // 找到移动的是哪个点
              const targetIndex = this.points.findIndex(t => t === e.target);
              // console.log('targetIndex =', targetIndex);
              if (targetIndex !== -1) {
                // console.log('app.editor.element', app.editor.element);
                const newPointDatas = [...curLine.points as IPointData[]];
                newPointDatas[targetIndex].x += e.getPageMove().x / this.editor.app.tree!.scaleX!;
                newPointDatas[targetIndex].y += e.getPageMove().y / this.editor.app.tree!.scaleY!;
                // (app.editor.element as Line).points = newPointDatas;
                curLine.points = newPointDatas;
                // e.target.set({x: e.target.x + e.getPageMove().x, y: e.target.y + e.getPageMove().y})
              }
              // console.log('drag point', e.getPageMove());
            },
            [PointerEvent.DOUBLE_CLICK]: (e: PointerEvent) => {
              if (this.points.length < 3) return;
              // 找到要删除的的是哪个点
              const targetIndex = this.points.findIndex(t => t === e.target);
              if (targetIndex !== -1) {
                const newPointDatas: IPointData[] = [];
                for (let i = 0; i < (curLine.points?.length || 0); ++i) {
                  if (i !== targetIndex) {
                    newPointDatas.push(curLine.points![i] as IPointData);
                  }
                }
                curLine.points = newPointDatas;
              }
            }
          }
        });
        this.view.add(point);
        this.points.push(point);
      }
    } else if (i < this.points.length) {
      // 点数减少
      for (; i < this.points.length; i++) {
        this.points[i].destroy();
      }
      this.points.length = pointDatas.length;
    }
  }
}
