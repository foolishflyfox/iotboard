import { Line } from 'leafer-ui';
import { mimicVar } from '.';
import * as _ from 'lodash-es';

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

  deleteHorizontalLine() {
    if (!this.curHorizontalLine) return;
    const curY = this.curHorizontalLine.points![1] as number;
    const newHorizontalLines: Line[] = [];
    for (const line of this.horizontalLines) {
      const lineY = line.proxyData!.points![1] as number;
      if (Math.abs(curY - lineY) < 3) {
        // 删除线
        mimicVar.displayEditor.app?.sky.remove(line);
      } else {
        newHorizontalLines.push(line);
      }
    }
    this.horizontalLines = newHorizontalLines;
  }

  addHorizontalLine() {
    if (!this.curHorizontalLine) return;
    const newLine = this.curHorizontalLine.clone() as Line;
    newLine.dashPattern = undefined;
    mimicVar.displayEditor.app?.sky.add(newLine);
    this.horizontalLines.push(newLine);
  }

  deleteVerticalLine() {
    if (!this.curVerticalLine) return;
    const curX = this.curVerticalLine.points![0] as number;
    const newVerticalLines: Line[] = [];
    for (const line of this.verticalLines) {
      const lineX = line.proxyData!.points![0] as number;
      if (Math.abs(curX - lineX) < 3) {
        mimicVar.displayEditor.app?.sky.remove(line);
        _.pull(this.verticalLines, line);
      } else {
        newVerticalLines.push(line);
      }
    }
    this.verticalLines = newVerticalLines;
  }

  addVerticalLine() {
    if (!this.curVerticalLine) return;
    const newLine = this.curVerticalLine.clone() as Line;
    mimicVar.displayEditor.app?.sky.add(newLine);
    this.verticalLines.push(newLine);
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

  clearAllBaselines() {
    for (const line of [...this.horizontalLines, ...this.verticalLines]) {
      mimicVar.displayEditor.app?.sky.remove(line);
    }
    this.horizontalLines = [];
    this.verticalLines = [];
    this.clearCurBaseLine();
  }

  clearCurBaseLine() {
    this.deleteCurHorizontalLine();
    this.deleteCurVerticalLine();
  }
}
