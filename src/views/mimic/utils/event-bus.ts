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
      console.log('@@@@@');
      eventBusStore.componentUpdateHandlers.push(componentUpdateHandler);
    }
  },
  unregisterComponentUpdateHandler(componentUpdateHandler: ComponentUpdateHandler) {
    if (!!componentUpdateHandler) {
      console.log('1###', eventBusStore.componentUpdateHandlers.length);
      _.pull(eventBusStore.componentUpdateHandlers, componentUpdateHandler);
      console.log('2###', eventBusStore.componentUpdateHandlers.length);
    }
  },
  emitComponentUpdate(componentTag: string) {
    for (const handler of eventBusStore.componentUpdateHandlers) {
      handler(componentTag);
    }
  },
};
