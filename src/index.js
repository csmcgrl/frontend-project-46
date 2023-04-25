#!/usr/bin/env node
import { readFileSync } from 'fs';
import _ from 'lodash';

const gendiff = (file1, file2) => {
  const file1ForReading = readFileSync(file1);
  const file1json = JSON.parse(file1ForReading);

  const file2ForReading = readFileSync(file2);
  const file2json = JSON.parse(file2ForReading);

  let result = '';

  const keys1 = Object.keys(file1json);
  const keys2 = Object.keys(file2json);
  const sortedUniqArrays = _.sortBy(_.uniq(keys1.concat(keys2)));
  const hasProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

  sortedUniqArrays.forEach((key) => {
    if (hasProperty(file1json, key) && hasProperty(file2json, key)) {
      result = file1json[key] === file2json[key] ? `${result}  ${key}: ${file1json[key]}\n` : `${result}- ${key}: ${file1json[key]}\n+ ${key}: ${file2json[key]}\n`;
    } else {
      result = hasProperty(file1json, key) ? `${result}- ${key}: ${file1json[key]}\n` : `${result}+ ${key}: ${file2json[key]}\n`;
    }
  });

  return `{\n${result}}`;
};
export default gendiff;
