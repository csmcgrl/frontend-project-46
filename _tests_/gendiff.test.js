import { test, expect } from '@jest/globals';
import gendiff from '../index.js';
import { getFileContent } from '../src/gendiff.js';

test('find differences between attached files json', async () => {
  const result = getFileContent('expected.txt');
  const difference = gendiff('file1.json', 'file2.json');
  expect(difference).toEqual(result);
});

test('find differences between attached files yml', async () => {
  const result = getFileContent('expected.txt');
  const difference = gendiff('file1.yml', 'file2.yml');
  expect(difference).toEqual(result);
});

test('show plain diff', async () => {
  const result = getFileContent('expectedPlain.txt');
  const plainDiff = gendiff('file1.json', 'file2.json', 'plain');
  expect(plainDiff).toEqual(result);
});

test('show json diff', async () => {
  const result = getFileContent('expectedJSON.txt');
  const jsonDiff = gendiff('file1.json', 'file2.json', 'json');
  expect(jsonDiff).toEqual(result);
});
