import yaml from 'js-yaml';

const fileToParse = (file, extname) => {
  let parsedFile;
  switch (extname) {
    case '.json':
      parsedFile = JSON.parse(file);
      break;
    case '.yml':
      parsedFile = yaml.load(file, 'utf8');
      break;
    case '.yaml':
      parsedFile = yaml.load(file, 'utf8');
      break;
    default:
      throw new Error(`Unknown extension - ${extname}`);
  }

  return parsedFile;
};

export default fileToParse;
