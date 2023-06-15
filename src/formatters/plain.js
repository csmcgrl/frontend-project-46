const formatValue = (data) => {
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }
  return typeof data === 'string' ? `'${data}'` : data;
};

const plainFormat = (tree, keys = '') => {
  const result = tree.reduce((accumulator, currentValue) => {
    // const { type, key, value, oldValue, newValue, children } = currentValue;

    const propertyPath = `${keys}${currentValue.key}`;
    switch (currentValue.type) {
      case 'added':
        return `${accumulator}Property '${propertyPath}' was added with value: ${formatValue(currentValue.value)}\n`;
      case 'deleted':
        return `${accumulator}Property '${propertyPath}' was removed\n`;
      case 'changed':
        return `${accumulator}Property '${propertyPath}' was updated. From ${formatValue(currentValue.oldValue)} to ${formatValue(currentValue.newValue)}\n`;
      case 'nested':
        return `${accumulator}${plainFormat(currentValue.children, `${propertyPath}.`)}\n`;
      default:
        return accumulator;
    }
  }, '');
  return result.trim();
};

export default plainFormat;
