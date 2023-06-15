import { test, expect } from '@jest/globals';
import path from 'path';
import gendiff from '../index.js';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', `${filename}`);

test('find differences between attached files json', async () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = fs.readFileSync(getFixturePath('expected.txt'), 'utf8');
  const difference = gendiff(file1, file2, 'stylish');
  expect(difference).toEqual(result);
});

test('find differences between attached files yml', async () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const result = fs.readFileSync(getFixturePath('expected.txt'), 'utf8');
  const difference = gendiff(file1, file2, 'stylish');
  expect(difference).toEqual(result);
});

test('show plain diff', async () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = fs.readFileSync(getFixturePath('expectedPlain.txt'), 'utf8');
  const difference = gendiff(file1, file2, 'plain');
  expect(difference).toEqual(result);
});

test('show json diff', async () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = fs.readFileSync(getFixturePath('expectedJSON.txt'), 'utf8');
  const difference = gendiff(file1, file2, 'json');
  expect(difference).toEqual(result);
});
