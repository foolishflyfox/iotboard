import type { Line } from 'leafer-ui';
import { mimicVar } from '.';

export class BaselineManager {
  private horizontalLines: Line[] = [];
  private verticalLines: Line[] = [];
  private curHorizontalLine?: Line;
  private curVerticalLine?: Line;

  setCurHorizontalLine(line: Line) {
    this.curHorizontalLine = line;
    mimicVar.displayEditor.app!.sky.add(line);
  }

  getCurHorizontalLine() {
    return this.curHorizontalLine;
  }

  deleteCurHorizontalLine() {
    if (this.curHorizontalLine) {
      mimicVar.displayEditor.app?.sky.remove(this.curHorizontalLine);
      this.curHorizontalLine = undefined;
    }
  }

  setCurVerticalLine(line: Line) {
    this.curVerticalLine = line;
    mimicVar.displayEditor.app!.sky.add(line);
  }

  getCurVerticalLine() {
    return this.curVerticalLine;
  }

  deleteCurVerticalLine() {
    if (this.curVerticalLine) {
      mimicVar.displayEditor.app?.sky.remove(this.curVerticalLine);
      this.curVerticalLine = undefined;
    }
  }
}
