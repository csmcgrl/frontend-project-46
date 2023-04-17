#!/usr/bin/env node
import _ from 'lodash';
import { program } from 'commander';
import { readFileSync } from 'fs';
import path from 'path';
program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1');

program.parse();

// Приведение к объектам

const args = program.args;

const file1ForReading = readFileSync(path.resolve(args[0]));
const file1json = JSON.parse(file1ForReading);

const file2ForReading = readFileSync(path.resolve(args[1]));
const file2json = JSON.parse(file2ForReading);

// Сравнение двух объектов

const gendiff = (file1json, file2json) => {
  let result = '';

  const keys1 = Object.keys(file1json);
  const keys2 = Object.keys(file2json);
  const sortedUniqArrays = _.sortBy(_.uniq(keys1.concat(keys2)));

  for (let key of sortedUniqArrays) {
    if (file1json.hasOwnProperty(key) && file2json.hasOwnProperty(key)) {
      result =
        file1json[key] === file2json[key]
          ? result + '  ' + key + ': ' + file1json[key] + '\n'
          : result +
            '- ' +
            key +
            ': ' +
            file1json[key] +
            '\n' +
            '+ ' +
            key +
            ': ' +
            file2json[key] +
            '\n';
    } else
      result = file1json.hasOwnProperty(key)
        ? result + '- ' + key + ': ' + file1json[key] + '\n'
        : result + '+ ' + key + ': ' + file2json[key] + '\n';
  }

  return `{\n${result}}`;
};

console.log(gendiff(file1json, file2json));
