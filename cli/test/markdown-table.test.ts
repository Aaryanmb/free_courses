import { assert, describe, expect, it } from 'vitest';
import { markdownTable } from '../lib/markdown-table';

const basicTable = `| A | B |
| - | - |
| 1 | 2 |`;

const basicTableWithUrl = `| A | B | Url |
| - | - | --- |
| 1 | 2 | [1](https://example.com/) |`;

const bigJsonData = [
  {
    id: '1',
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'example@hello.com',
  },
  {
    id: '2',
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'hello@world.com',
  },
];

describe('Markdown Table', () => {
  it('should render a basic table', () => {
    assert.equal(markdownTable([{ a: 1, b: 2 }]), basicTable);
  });

  it('should render a basic table with a url', () => {
    assert.equal(markdownTable([{ a: 1, b: 2, url: 'https://example.com/' }], { urlKeyName: 'a' }), basicTableWithUrl);
  });

  it('should render a big json data', () => {
    expect(markdownTable(bigJsonData)).toMatchSnapshot();
  });

  it('should throw an error if the data is empty', () => {
    expect(() => markdownTable([])).toThrowError();
  });
});
