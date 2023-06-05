const iter = (data) => {
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }
  return typeof data === 'string' ? `'${data}'` : data;
};

const plainFormat = (tree, keys = '') => {
  let result = '';

  tree.forEach((obj) => {
    const paths = [];
    switch (obj.type) {
      case 'added':
        result += `Property '${keys}${obj.key}' was added with value: ${iter(obj.value)}\n`;
        break;
      case 'deleted':
        result += `Property '${keys}${obj.key}' was removed\n`;
        break;
      case 'changed':
        result += `Property '${keys}${obj.key}' was updated. From ${iter(obj.oldValue)} to ${iter(obj.newValue)}\n`;
        break;
      case 'nested':
        paths.push(obj.key);
        paths.join('.');
        result += `${plainFormat(obj.children, `${keys}${paths}.`)}\n`;
        break;
      case 'unchanged':
        result += '';
        break;
      default:
        console.log('No such type');
    }
  });
  return result.trim();
};
export default plainFormat;
