import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const fileToParse = (file) => {
  const fileForReading = readFileSync(file, 'utf8');
  let parsedFile;
  switch (path.extname(file)) {
    case '.json':
      parsedFile = JSON.parse(fileForReading);
      break;
    case '.yml':
      parsedFile = yaml.load(fileForReading, 'utf8');
      break;
    case '.yaml':
      parsedFile = yaml.load(fileForReading, 'utf8');
      break;
    default:
      throw new Error('Not supported format');
  }

  return parsedFile;
};

export default fileToParse;
