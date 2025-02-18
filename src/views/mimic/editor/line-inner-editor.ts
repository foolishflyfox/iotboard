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
  public lines: Line[];

  constructor(editor: Editor) {
    super(editor);
    this.points = [];
    this.lines = [];
  }

  public onLoad(): void {
    this.editBox.add(this.view);
  }

  public onUpdate(): void {
    const { scaleX, scaleY } = this.editBox.app.tree!;
    const curLine = this.editor.element as Line;
    const pointDatas = curLine.points as IPointData[];
    let pIndex = 0;
    let minX = pointDatas[0].x;
    let minY = pointDatas[0].y;
    for (let i = 1; i < pointDatas.length; ++i) {
      minX = Math.min(minX, pointDatas[i].x);
      minY = Math.min(minY, pointDatas[i].y);
    }
    for (; pIndex < this.points.length && pIndex < pointDatas.length; pIndex++) {
      const x = (pointDatas[pIndex].x - minX) * scaleX!;
      const y = (pointDatas[pIndex].y - minY) * scaleY!;
      this.points[pIndex].set({ x, y });
    }
    for (let i = 1; i < this.points.length; i++) {
      this.lines[i - 1].points = [
        {
          x: this.points[i - 1].x!,
          y: this.points[i - 1].y!
        },
        {
          x: this.points[i].x!,
          y: this.points[i].y!
        }
      ];
    }

    if (pIndex < pointDatas.length) {
      // 点数增多
      for (; pIndex < pointDatas.length; pIndex++) {
        const point = new Box({
          ...this.editBox.getPointStyle(),
          // strokeWidth: 1,
          x: (pointDatas[pIndex].x - minX) * scaleX!,
          y: (pointDatas[pIndex].y - minY) * scaleY!,
          hoverStyle: {
            fill: 'red'
          },
          event: {
            [DragEvent.DRAG]: (e: DragEvent) => {
              // 找到移动的是哪个点
              const targetIndex = this.points.findIndex(t => t === e.target);
              if (targetIndex !== -1) {
                const newPointDatas = [...curLine.points as IPointData[]];
                newPointDatas[targetIndex].x += e.getPageMove().x / this.editor.app.tree!.scaleX!;
                newPointDatas[targetIndex].y += e.getPageMove().y / this.editor.app.tree!.scaleY!;
                curLine.points = newPointDatas;
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
        point.zIndex = 1;
        if (pIndex > 0) {
          const line = new Line({
            stroke: 'red',
            strokeWidth: 3,
            zIndex: 0,
            hoverStyle: {
              strokeWidth: 5,
              cursor: 'crosshair'
            },
            points: [
              {
                x: this.points[pIndex - 1].x!,
                y: this.points[pIndex - 1].y!
              },
              {
                x: point.x!,
                y: point.y!
              }
            ],
            event: {
              [PointerEvent.CLICK]: (e: PointerEvent) => {
                const lineIndex = this.lines.findIndex(t => t === e.target);
                if (lineIndex === -1) return;
                const line = this.lines[lineIndex];
                const x1 = (line.points![0] as IPointData).x!;
                const y1 = (line.points![0] as IPointData).y!;
                const x2 = (line.points![1] as IPointData).x!;
                const y2 = (line.points![1] as IPointData).y!;
                const { x, y } = e.getLocalPoint();
                const xRate = (x - x1) / (x2 - x1);
                const yRate = (y - y1) / (y2 - y1);
                // 添加新的锚点
                const pointDatas = curLine.points as IPointData[];
                const newPointDatas: IPointData[] = [];

                for (let i = 0; i < pointDatas.length; ++i) {
                  newPointDatas.push(pointDatas[i]);
                  if (i === lineIndex) {
                    const curPointData = pointDatas[i];
                    const nextPointData = pointDatas[i + 1];
                    newPointDatas.push({
                      x: curPointData.x + (nextPointData.x - curPointData.x) * xRate,
                      y: curPointData.y + (nextPointData.y - curPointData.y) * yRate
                    });
                  }
                }
                curLine.points = newPointDatas;
              }
            }
          });
          this.view.add(line);
          this.lines.push(line);
        }

        this.view.add(point);
        this.points.push(point);
      }
    } else if (pIndex < this.points.length) {
      // 点数减少
      for (let i = pIndex; i < this.points.length; i++) {
        this.points[i].destroy();
      }
      for (let i = pIndex - 1; i < this.lines.length; i++) {
        this.lines[i].destroy();
      }
      this.points.length = pointDatas.length;
      this.lines.length = pointDatas.length - 1;
    }
  }

  public onUnload(): void {
    this.editBox.remove(this.view);
  }
}
