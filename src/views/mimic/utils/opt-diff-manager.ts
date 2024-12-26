export interface OptDiffItem {
  attrName: string;
  oldValue: any;
  newValue: any;
}

export type OptDiff = OptDiffItem[];

export class JsonDiffPatchManager {
  private undoPatchs: OptDiff[];
  private undoCount: Ref<number>;
  private undoEnable: ComputedRef<boolean>;
  private redoPatchs: OptDiff[];
  private redoCount: Ref<number>;
  private redoEnable: ComputedRef<boolean>;

  constructor() {
    this.undoPatchs = [];
    this.undoCount = ref(this.undoPatchs.length);
    this.undoEnable = computed(() => this.undoCount.value > 0);
    this.redoPatchs = [];
    this.redoCount = ref(this.redoPatchs.length);
    this.redoEnable = computed(() => this.redoCount.value > 0);
  }

  private updateCount() {
    this.undoCount.value = this.undoPatchs.length;
    this.redoCount.value = this.redoPatchs.length;
  }

  getUndoEnable() {
    return this.undoEnable;
  }

  getRedoEnable() {
    return this.redoEnable;
  }

  undo() {
    let diff: OptDiff = [];
    if (this.undoPatchs.length > 0) {
      diff = this.undoPatchs.pop()!;
      this.redoPatchs.push(diff);
      this.updateCount();
    }
    return diff;
  }

  redo() {
    let diff: OptDiff = [];
    if (this.redoPatchs.length > 0) {
      diff = this.redoPatchs.pop()!;
      this.undoPatchs.push(diff);
      this.updateCount();
    }
    return diff;
  }
}
