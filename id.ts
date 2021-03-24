export function getNewId(): string {
  return "a" + Date.now() + "_" + Math.floor(Math.random() * 1e6);
}
