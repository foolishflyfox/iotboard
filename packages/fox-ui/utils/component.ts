import { Flow } from '@leafer-in/flow';
//

export abstract class Component<Props extends Record<string, any>> extends Flow {
  props: Props;

  //   protected constructor(props: Props, data?: IFlowInput) {}
}
