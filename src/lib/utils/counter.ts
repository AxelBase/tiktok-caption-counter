export function count(text: string) {
  const characters = text.length;
  const words = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
  return { characters, words };
}
