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

test.each(extensions)('compare files and test different formatters (%s)', (ext) => {
  const fileBefore = getFixturePath(`file1.${ext}`);
  const fileAfter = getFixturePath(`file2.${ext}`);

  const stylishDifference = gendiff(fileBefore, fileAfter, 'stylish');
  const plainDifference = gendiff(fileBefore, fileAfter, 'plain');
  const jsonDifference = gendiff(fileBefore, fileAfter, 'json');
  const noFormatDifference = gendiff(fileBefore, fileAfter);

  expect(stylishDifference).toEqual(stylishResult);
  expect(plainDifference).toEqual(plainResult);
  expect(jsonDifference).toEqual(jsonResult);
  expect(noFormatDifference).toEqual(stylishResult);
});
