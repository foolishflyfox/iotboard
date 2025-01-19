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
  }

  public onUnload(): void {
    this.editBox.remove(this.view);
  }
}
