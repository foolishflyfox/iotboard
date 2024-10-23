import type { EditorEvent } from 'leafer-editor';
import * as _ from 'lodash-es';

export function selectHandler(event: EditorEvent) {
  const ui = event.value;
  if (ui === null) {
    // 没有选中任何UI元素
  } else if (_.isArray(ui)) {
    // 选中的是多个UI元素
  } else {
    // 选中的是单个UI元素
    console.log('ui =', ui);
    console.log('ui.id =', ui.id);
    console.log('ui.json =', ui.toJSON());
  }
}
