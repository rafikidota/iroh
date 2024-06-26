export function lowerCase(str: string): string {
  return str.toLocaleLowerCase();
}

export function upperCase(str: string): string {
  return str.toUpperCase();
}

export function dashToUnderscore(str: string): string {
  return str.replace(/-/g, '_');
}
