import mitt from 'mitt';

// eslint-disable-next-line ts/consistent-type-definitions
type Events = {
  /** 更新属性 */
  mimicUpdateAttr: string;
};

export const emitter = mitt<Events>();
