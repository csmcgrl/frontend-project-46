import path from 'path';
import process from 'process';
import fs from 'fs';
import fileToParse from './parsers.js';
import buildAST from './buildAST.js';
import chooseFormatter from './formatters/index.js';

const getFileContent = (filepath) => {
  const fullpath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullpath, 'utf-8');
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
