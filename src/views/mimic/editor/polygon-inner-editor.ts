import { Box, Editor, InnerEditor, Line, registerInnerEditor, type IPointData } from 'leafer-editor';

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
          {
            x: this.points[(i + pts - 1) % pts].x!,
            y: this.points[(i + pts - 1) % pts].y!
          },
          {
            x: this.points[i].x!,
            y: this.points[i].y!
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
          ]
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
