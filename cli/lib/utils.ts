export function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function omit<T extends object, K extends keyof T>(obj: T, arr: K[]): Omit<T, K> {
  return Object.keys(obj)
    .filter((k) => !arr.includes(k as K))
    .reduce((acc, key) => {
      (acc as Record<string, unknown>)[key] = obj[key as K];
      return acc;
    }, {} as Partial<T>) as Omit<T, K>;
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function variableNameToSentence(str: string): string {
  return str
    .split(/(?=[A-Z])/)
    .map(capitalizeFirstLetter)
    .join(' ');
}

export function generateHyphens(length: number): string {
  return Array.from({ length }, () => '-').join('');
}

export function generateMarkdownUrl(displayText: string, url: string): string {
  return `[${displayText}](${url})`;
}
