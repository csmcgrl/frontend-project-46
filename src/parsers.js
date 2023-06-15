import yaml from 'js-yaml';

const fileToParse = (file, extname) => {
  switch (extname) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.load(file, 'utf8');
    case '.yaml':
      return yaml.load(file, 'utf8');
    default:
      throw new Error(`Unknown extension - ${extname}`);
  }
};
export default fileToParse;
