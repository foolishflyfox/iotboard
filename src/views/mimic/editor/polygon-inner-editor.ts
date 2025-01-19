import { Box, Editor, InnerEditor, Line, registerInnerEditor } from 'leafer-editor';

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

  public onUpdate(): void {}

  public onUnload(): void {
    this.editBox.remove(this.view);
  }
}
