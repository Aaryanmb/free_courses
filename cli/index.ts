import { README, SOLOLEARN, UDEMY } from './config/files';
import { buildContent, updateReadme, getFile } from './lib/content';
import { markdownTable } from './lib/markdown-table';
import { omit } from './lib/utils';

const omitIds = <T extends object>(obj: T): Omit<T, keyof T> => omit(obj, ['id'] as Array<keyof T>);

const cli = async () => {
  const udemyFile = await getFile(UDEMY);
  const sololearnFile = await getFile(SOLOLEARN);

  const udemyData = JSON.parse(udemyFile ?? '').map(omitIds);
  const sololearnData = JSON.parse(sololearnFile ?? '').map(omitIds);

  const urlKeyName = 'courseName';
  const udemyTable = markdownTable(udemyData, { urlKeyName });
  const sololearnTable = markdownTable(sololearnData, { urlKeyName });

  const udemyContent = {
    title: 'Udemy Courses',
    content: udemyTable,
  };

  const sololearnContent = {
    title: 'Sololearn Courses',
    content: sololearnTable,
  };

  const courses = [udemyContent, sololearnContent].map(buildContent).join('\n\n');

  const readme = await getFile(README);

  if (readme) {
    updateReadme(README, courses);
  }
};

cli();
