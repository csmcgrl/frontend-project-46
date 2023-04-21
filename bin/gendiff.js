#!/usr/bin/env node
import gendiff from '../src/index.js';
import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  })
  .version('0.0.1')
  .parse(process.argv);
