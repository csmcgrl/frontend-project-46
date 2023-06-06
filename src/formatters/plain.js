const formatValue = (data) => {
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }
  return typeof data === 'string' ? `'${data}'` : data;
};

const plainFormat = (tree, keys = '') => {
  let result = '';

  tree.forEach((obj) => {
    const { type, key, value, oldValue, newValue, children } = obj;

    const propertyPath = `${keys}${key}`;

    switch (type) {
      case 'added':
        result += `Property '${propertyPath}' was added with value: ${formatValue(value)}\n`;
        break;
      case 'deleted':
        result += `Property '${propertyPath}' was removed\n`;
        break;
      case 'changed':
        result += `Property '${propertyPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}\n`;
        break;
      case 'nested':
        result += `${plainFormat(children, `${propertyPath}.`)}\n`;
        break;
      case 'unchanged':
        break;
      default:
        console.log('No such type');
    }
  });

  return result.trim();
};

export default plainFormat;
