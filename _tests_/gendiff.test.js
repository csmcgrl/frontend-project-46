import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', `${filename}`);

const stylishResult = fs.readFileSync(getFixturePath('expected.txt'), 'utf8');
const plainResult = fs.readFileSync(getFixturePath('expectedPlain.txt'), 'utf8');
const jsonResult = fs.readFileSync(getFixturePath('expectedJSON.txt'), 'utf8');

const extensions = ['json', 'yml', 'yaml'];

test.each(extensions)('find differences between attached files (%s)', (ext) => {
  const file1 = getFixturePath(`file1.${ext}`);
  const file2 = getFixturePath(`file2.${ext}`);
  const difference = gendiff(file1, file2, 'stylish');
  expect(difference).toEqual(stylishResult);
});

test.each(extensions)('show plain diff (%s)', (ext) => {
  const file1 = getFixturePath(`file1.${ext}`);
  const file2 = getFixturePath(`file2.${ext}`);
  const difference = gendiff(file1, file2, 'plain');
  expect(difference).toEqual(plainResult);
});

test.each(extensions)('show json diff (%s)', (ext) => {
  const file1 = getFixturePath(`file1.${ext}`);
  const file2 = getFixturePath(`file2.${ext}`);
  const difference = gendiff(file1, file2, 'json');
  expect(difference).toEqual(jsonResult);
});

test('no formatter specified', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const difference = gendiff(file1, file2);
  expect(difference).toEqual(stylishResult);
});
