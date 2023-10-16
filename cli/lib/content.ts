import { readFile, writeFile } from 'fs/promises';
import { COURSES_REGEX } from '../config/constants';

type ContentData = {
  title?: string;
  content: string;
};

export const buildContent = ({ title, content }: ContentData): string => {
  if (title) {
    return `### ${title}\n\n${content}`;
  }
  return content;
};

export const replaceContent = (original: string, data: string): string => {
  const newContent = original.replace(COURSES_REGEX, `$1\n\n${data}`);
  return newContent;
};

export const getFile = async (file: string): Promise<string | undefined> => {
  const data = await readFile(file, 'utf-8');
  if (!data) {
    throw new Error('No file found');
  }
  return data;
};

export const updateReadme = async (file: string, data: string): Promise<void> => {
  const readme = await getFile(file);
  if (!readme) {
    throw new Error('No readme found');
  }
  const newText = replaceContent(readme, data);
  await writeFile(file, newText, 'utf-8');
};
