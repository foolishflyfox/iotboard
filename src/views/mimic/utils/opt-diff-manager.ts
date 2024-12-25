export interface OptDiffItem {
  attrName: string;
  oldValue: any;
  newValue: any;
}

export type OptDiff = OptDiffItem[];

export class JsonDiffPatchManager {
  private undoPatchs: OptDiff[];
  private redoPatchs: OptDiff[];
  constructor() {
    this.undoPatchs = [];
    this.redoPatchs = [];
  }

  undoEnable() {
    return this.undoPatchs.length > 0;
  }

  redoEnable() {
    return this.redoPatchs.length > 0;
  }

  getUndoDiff() {
    let diff: OptDiff = [];
    if (this.undoPatchs.length > 0) {
      diff = this.undoPatchs.pop()!;
      this.redoPatchs.push(diff);
    }
    return diff;
  }

  getRedoDiff() {
    let diff: OptDiff = [];
    if (this.redoPatchs.length > 0) {
      diff = this.redoPatchs.pop()!;
      this.undoPatchs.push(diff);
    }
    return diff;
  }
}
