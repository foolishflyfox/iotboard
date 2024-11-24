import * as _ from 'lodash-es';

type ComponentUpdateHandler = (componentTag: string) => void;

interface EventBusStore {
  componentUpdateHandlers: ComponentUpdateHandler[];
}

const eventBusStore: EventBusStore = {
  componentUpdateHandlers: [],
};

export const eventBus = {
  registerComponentUpdateHandler(componentUpdateHandler: ComponentUpdateHandler) {
    if (componentUpdateHandler && !_.find(componentUpdateHandler)) {
      eventBusStore.componentUpdateHandlers.push(componentUpdateHandler);
    }
  },
  unregisterComponentUpdateHandler(componentUpdateHandler: ComponentUpdateHandler) {
    if (!!componentUpdateHandler) {
      _.pull(eventBusStore.componentUpdateHandlers, componentUpdateHandler);
    }
  },
  emitComponentUpdate(componentTag: string) {
    for (const handler of eventBusStore.componentUpdateHandlers) {
      handler(componentTag);
    }
  },
};
