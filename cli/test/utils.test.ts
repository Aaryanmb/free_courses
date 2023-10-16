import { describe, expect, it } from 'vitest';
import { omit, isUrl, capitalizeFirstLetter, variableNameToSentence, generateMarkdownUrl, generateHyphens } from '../lib/utils';

describe('Utils', () => {
  it('should check if a string is a url', () => {
    expect(isUrl('https://example.com')).toBeTruthy();
    expect(isUrl('example.com')).toBeFalsy();
  });

  it('should omit keys from an object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['a', 'b'])).toEqual({ c: 3 });
  });

  it('should capitalize the first letter of a string', () => {
    expect(capitalizeFirstLetter('hello')).toEqual('Hello');
  });

  it('should convert a variable name to a sentence', () => {
    expect(variableNameToSentence('helloWorld')).toEqual('Hello World');
  });

  it('should generate hyphens', () => {
    expect(generateHyphens(10)).toEqual('----------');
  });

  it('should generate a markdown url', () => {
    expect(generateMarkdownUrl('hello', 'https://example.com')).toEqual('[hello](https://example.com)');
  });
});
