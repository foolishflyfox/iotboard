import { BaselineManager } from './baseline-manager';
import { BaseContainer } from './base-container';

export class BaselineManagerContainer extends BaseContainer<BaselineManager> {
  constructor() {
    super(BaselineManager);
  }
}
