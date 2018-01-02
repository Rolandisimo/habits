export function keyExists(keys: string[], key: string) {
  return (keys.indexOf(key) !== -1);
}

export function historyDate() {
  const date = new Date();
  return (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
}
