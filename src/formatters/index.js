import getFormattedDiff from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const chooseFormatter = (tree, formatName) => {
  if (formatName === 'plain') {
    return plainFormat(tree);
  }
  if (formatName === 'json') {
    return jsonFormat(tree);
  }
  return getFormattedDiff(tree);
};
export default chooseFormatter;
