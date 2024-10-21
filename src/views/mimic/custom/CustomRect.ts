import { Rect, registerUI } from 'leafer-ui';

@registerUI()
export class CustomRect extends Rect {
  public get __tag() {
    return 'CustomRect';
  }
}
