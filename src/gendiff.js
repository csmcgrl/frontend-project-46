import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fileToParse from './parsers.js';
import buildAST from './buildAST.js';
import chooseFormatter from './formatters/index.js';

const getFullPath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fullpath = path.join(__dirname, '..', '__fixtures__', filename);
  return fullpath;
};

export const getFileContent = (filename) => {
  const fullpath = getFullPath(filename);
  return readFileSync(fullpath, 'utf-8');
};

const getFileExtname = (filepath) => path.extname(filepath);

const gendiff = (filepath1, filepath2, formatName) => {
  const file1 = getFileContent(filepath1);
  const extname1 = getFileExtname(filepath1);
  const parsedFile1 = fileToParse(file1, extname1);

  const file2 = getFileContent(filepath2);
  const extname2 = getFileExtname(filepath2);
  const parsedFile2 = fileToParse(file2, extname2);

  const diffTree = buildAST(parsedFile1, parsedFile2);
  return chooseFormatter(diffTree, formatName);
};

export default gendiff;
