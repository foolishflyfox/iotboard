import { Line, Text, type IPointData } from 'leafer-ui';
import { mimicVar } from '.';
import { useMimicWorkspaceStatus } from '@mimic/stores';
import { getScaleX } from '@/utils';

const fontSize = 6;

export class BaselineManager {
  private horizontalLines: Line[] = [];
  private verticalLines: Line[] = [];
  private curHorizontalLine?: Line;
  private curVerticalLine?: Line;
  /** 用于显示当前辅助线位置的文本 */
  private posText?: Text;
  private cursorPos?: Ref<IPointData | undefined>;

  private getPosText(): Text {
    if (this.posText) return this.posText;
    this.posText = new Text({
      text: '',
      fill: '#FF0000',
      x: 0,
      y: 0,
      visible: false,
      fontSize
    });
    mimicVar.displayEditor.app!.sky.add(this.posText);
    return this.posText;
  }

  private getCursorPos(): Ref<IPointData | undefined> {
    if (!this.cursorPos) {
      const { cursorPos } = toRefs(useMimicWorkspaceStatus());
      this.cursorPos = cursorPos;
      watch(cursorPos, (nv) => {
        if (nv) {
          this.movePosText();
        }
      });
    }
    return this.cursorPos;
  }

  private movePosText() {
    const posText = this.getPosText();
    const cursorPos = this.getCursorPos();
    if (cursorPos.value && (this.curHorizontalLine || this.curVerticalLine)) {
      if (this.curHorizontalLine) {
        posText.text = cursorPos.value.y.toFixed(3);
      } else {
        posText.text = cursorPos.value.x.toFixed(3);
      }
      posText.x = cursorPos.value.x + 3;
      posText.y = cursorPos.value.y + 3;
      posText.visible = true;
      const newFontSize = Math.round(
        fontSize / getScaleX(mimicVar.displayEditor.app!.sky.getTransform()) * 3
      );
      if (newFontSize !== posText.fontSize) {
        posText.fontSize = newFontSize;
      }
    }
  }

  private hidePosText() {
    if (!this.posText) return;
    this.posText.visible = false;
  }

  setCurHorizontalLine(line: Line) {
    this.curHorizontalLine = line;
    mimicVar.displayEditor.app!.sky.add(line);
    this.movePosText();
  }

  getCurHorizontalLine() {
    return this.curHorizontalLine;
  }

  deleteCurHorizontalLine() {
    if (this.curHorizontalLine) {
      mimicVar.displayEditor.app?.sky.remove(this.curHorizontalLine);
      this.curHorizontalLine = undefined;
      this.hidePosText();
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
      } else {
        newVerticalLines.push(line);
      }
    }
    this.verticalLines = newVerticalLines;
  }

  addVerticalLine() {
    if (!this.curVerticalLine) return;
    const newLine = this.curVerticalLine.clone() as Line;
    newLine.dashPattern = undefined;
    mimicVar.displayEditor.app?.sky.add(newLine);
    this.verticalLines.push(newLine);
  }

  setCurVerticalLine(line: Line) {
    this.curVerticalLine = line;
    mimicVar.displayEditor.app!.sky.add(line);
    this.movePosText();
  }

  getCurVerticalLine() {
    return this.curVerticalLine;
  }

  deleteCurVerticalLine() {
    if (this.curVerticalLine) {
      mimicVar.displayEditor.app?.sky.remove(this.curVerticalLine);
      this.curVerticalLine = undefined;
      this.hidePosText();
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

  // 隐藏 baselines
  hideAllBaselines() {
    for (const line of [...this.horizontalLines, ...this.verticalLines]) {
      line.visible = false;
    }
  }

  // 显示 baselines
  showAllBaselines() {
    for (const line of [...this.horizontalLines, ...this.verticalLines]) {
      line.visible = true;
    }
  }
}
