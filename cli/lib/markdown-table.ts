import { isUrl, variableNameToSentence, generateHyphens, generateMarkdownUrl } from './utils';

type MarkdownTableData = Record<string, unknown>[];

type MarkdownTableOptions = {
  urlKeyName?: string;
};

export function markdownTable(data: MarkdownTableData, { urlKeyName }: MarkdownTableOptions = {}): string {
  if (data.length === 0) {
    throw new Error('No data provided');
  }

  const headers = Object.keys(data[0]);
  const headerRow = `| ${headers.map(variableNameToSentence).join(' | ')} |`;
  const separatorRow = `| ${headers.map((header) => generateHyphens(header.length)).join(' | ')} |`;

  const rows = data
    .map((row) => {
      return `| ${headers
        .map((header) => {
          const value = row[header] ?? '';
          if (isUrl(value.toString())) {
            const displayText = urlKeyName ? row[urlKeyName]?.toString() : value;
            return generateMarkdownUrl(displayText as string, value as string);
          }
          return value;
        })
        .join(' | ')} |`;
    })
    .join('\n');

  return `${headerRow}\n${separatorRow}\n${rows}`;
}
