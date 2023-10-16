import path from 'path';

const root = (file: string): string => path.resolve(__dirname, '../../', file);

export const README = root('README.md');
export const UDEMY = root('udemy.json');
export const SOLOLEARN = root('Sololearn.json');
