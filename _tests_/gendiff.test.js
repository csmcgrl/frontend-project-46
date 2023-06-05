import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('find differences between attached files json', async () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = readFileSync(getFixturePath('expected.txt'), 'utf8');
  const difference = gendiff(file1, file2);
  expect(difference).toEqual(result);
});

test('find differences between attached files yml', async () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const result = readFileSync(getFixturePath('expected.txt'), 'utf8');
  const difference = gendiff(file1, file2);
  expect(difference).toEqual(result);
});

test('show plain diff', async () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const plainDiff = gendiff(file1, file2, 'plain');
  const result = readFileSync(getFixturePath('expectedPlain.txt'), 'utf8');
  expect(plainDiff).toEqual(result);
});

test('show json diff', async () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const jsonDiff = gendiff(file1, file2, 'json');
  const result = readFileSync(getFixturePath('expectedJSON.txt'), 'utf8');
  expect(jsonDiff).toEqual(result);
});
