export function getUniqueId() {
  const rt = 1000;
  return (Date.now() * rt + Math.floor(Math.random() * rt)).toString();
}
