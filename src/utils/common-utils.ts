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
