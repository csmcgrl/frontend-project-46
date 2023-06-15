import getFormattedDiff from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const chooseFormatter = (tree, formatName) => {
  switch (formatName) {
    case 'plain':
      return plainFormat(tree);
    case 'json':
      return jsonFormat(tree);
    case 'stylish':
      return getFormattedDiff(tree);
    case undefined:
      return getFormattedDiff(tree);
    default:
      throw new Error(`Unknown format name - ${formatName}`);
  }
};
export default chooseFormatter;
