#!/usr/bin/env node
import _ from 'lodash';
import fileToParse from './parsers.js';

const gendiff = (fileBefore, fileAfter) => {
  const file1 = fileToParse(fileBefore);
  const file2 = fileToParse(fileAfter);
  let result = '';
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const sortedUniqArrays = _.sortBy(_.uniq(keys1.concat(keys2)));
  const hasProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

  sortedUniqArrays.forEach((key) => {
    if (hasProperty(file1, key) && hasProperty(file2, key)) {
      result = file1[key] === file2[key] ? `${result}  ${key}: ${file1[key]}\n` : `${result}- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}\n`;
    } else {
      result = hasProperty(file1, key) ? `${result}- ${key}: ${file1[key]}\n` : `${result}+ ${key}: ${file2[key]}\n`;
    }
  });

  return `{\n${result}}`;
};
export default gendiff;
