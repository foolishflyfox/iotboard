import { Flow } from '@leafer-in/flow';
import type { IFlowInputData } from '@leafer-ui/interface';
import '@leafer-in/state';
import '@leafer-in/animate';

export abstract class Component<Props extends Record<string, any>> extends Flow {
  props: Props;

  protected constructor(props: Props, data?: IFlowInputData) {
    super(data);
    this.props = this.proxyProps(props);
    this.render();
  }

  proxyProps(props: Props) {
    return new Proxy(props, {
      set: (obj, prop, value) => {
        obj[prop as keyof Props] = value;
        this.render();
        return true;
      }
    });
  }

  abstract render(): void;
}

export function fooComponentTest() {
  console.log('### foo component test');
}
