import getFormattedDiff from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const chooseFormatter = (tree, formatName) => {
  console.log(formatName);
  let format;
  switch (formatName) {
    case 'plain':
      format = plainFormat(tree);
      break;
    case 'json':
      format = jsonFormat(tree);
      break;
    case 'stylish':
      format = getFormattedDiff(tree);
      break;
    case undefined:
      format = getFormattedDiff(tree);
      break;
    default:
      throw new Error(`Unknown format name - ${formatName}`);
  }
  return format;
};
export default chooseFormatter;
