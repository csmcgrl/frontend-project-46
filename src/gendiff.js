import { readFileSync } from 'fs';
import path from 'path';
import fileToParse from './parsers.js';
import buildAST from './buildAST.js';
import getFormattedDiff from './formatters/stylish.js';

const getFileContent = (filename) => {
  const fullpath = path.resolve(process.cwd(), filename);
  return readFileSync(fullpath, 'utf-8');
};

const getFileExtname = (filepath) => path.extname(filepath);

const gendiff = (filepath1, filepath2) => {
  const file1 = getFileContent(filepath1);
  const extname1 = getFileExtname(filepath1);
  const parsedFile1 = fileToParse(file1, extname1);

  const file2 = getFileContent(filepath2);
  const extname2 = getFileExtname(filepath2);
  const parsedFile2 = fileToParse(file2, extname2);

  const diffTree = buildAST(parsedFile1, parsedFile2);
  return getFormattedDiff(diffTree);
};

export default gendiff;
