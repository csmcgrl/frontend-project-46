import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('find differences', async () => {
  const file1 = getFixturePath('file1ToTest.json');
  const file2 = getFixturePath('file2ToTest.json');
  const result = '{\n- follow: false\n- host: Daria\n+ host: Ivan\n+ proxy: 123.234.53.22\n  timeout: 50\n}';
  const difference = gendiff(file1, file2);
  expect(difference).toEqual(result);
});
