import getFormattedDiff from './stylish.js';
import plainFormat from './plain.js';

const chooseFormatter = (tree, formatName) => {
  if (formatName === 'plain') {
    return plainFormat(tree);
  }
  return getFormattedDiff(tree);
};
export default chooseFormatter;
