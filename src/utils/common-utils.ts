import * as _ from 'lodash-es';

/** 产生唯一的 id */
export function getUniqueId() {
  const rt = 1000;
  return (Date.now() * rt + Math.floor(Math.random() * rt)).toString();
}

/** 判断字符串是否为正确的 JSON 格式 */
export function isJSON(s: string) {
  try {
    JSON.parse(s);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 将参数转换成数组
 * @param v 单个对象或对象数组
 * @param excludeNil 是否删除空元素，默认删除
 */
export function convertToArray<T>(v: T | T[], excludeNil = true): T[] {
  let result: any = [];
  if (_.isArray(v)) {
    result = v;
  } else {
    result.push(v);
  }
  if (excludeNil) {
    result = result.filter(e => !_.isNil(e));
  }
  return result;
}
