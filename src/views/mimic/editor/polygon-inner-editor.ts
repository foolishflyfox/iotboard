import { Box, DragEvent, Editor, InnerEditor, Line, PointerEvent, registerInnerEditor, type IPointData } from 'leafer-editor';

export const PolygonInnerEditorTag = 'PolygonInnerEditor';

@registerInnerEditor()
export class PolygonInnerEditor extends InnerEditor {
  public get tag() {
    return PolygonInnerEditorTag;
  }

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
    if (pIndex < pointDatas.length) {
      // 点数增加
      for (; pIndex < pointDatas.length; pIndex++) {
        const point = new Box({
          ...this.editBox.getPointStyle(),
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
            },
            [PointerEvent.DOUBLE_CLICK]: (e: PointerEvent) => {
              console.log('dbclick:', this.points.length);
              if (this.points.length < 4) return;
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
        this.view.add(point);
        this.points.push(point);
      }
    } else if (pIndex < this.points.length) {
      // 点数减少
      for (let i = pIndex; i < this.points.length; i++) {
        this.points[i].destroy();
      }
      this.points.length = pointDatas.length;
    }
    // 绘制线
    const pts = this.points.length;
    for (let i = 0; i < Math.max(this.points.length, this.lines.length); ++i) {
      if (i < this.points.length && i < this.lines.length) {
        this.lines[i].points = [
          { x: this.points[i].x!, y: this.points[i].y! },
          {
            x: this.points[(i + 1) % this.points.length!].x!,
            y: this.points[(i + 1) % this.points.length!].y!
          }
        ];
      } else if (i >= this.points.length) {
        // 线段过多，需要删除
        this.lines[i].destroy();
      } else {
        // 线段过少，需要增加
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
              x: this.points[(i + pts - 1) % pts].x!,
              y: this.points[(i + pts - 1) % pts].y!
            },
            {
              x: this.points[i].x!,
              y: this.points[i].y!
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
    }
    if (this.points.length !== this.lines.length) {
      this.lines.length = this.points.length;
    }
  }

  public onUnload(): void {
    this.editBox.remove(this.view);
  }
}
