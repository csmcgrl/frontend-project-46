const countSpace = (depth, symb = '  ') => {
  const quantity = 4;
  const indent = 2;
  const spaceAmount = depth * quantity - indent;
  const space = spaceAmount >= 0 ? ' '.repeat(spaceAmount) + symb : '';
  return space;
};

const checkData = (data, depth) => {
  if (typeof data !== 'object' || data == null) {
    return `${data}`;
  }
  const keys = Object.keys(data);
  let result = '';
  keys.forEach((key) => {
    result += `\n${countSpace(depth + 1)}${key}: ${checkData(data[key], depth + 1)}`;
  });
  return `{${result}\n${countSpace(depth)}}`;
};

const getformattedTree = (node) => {
  const typeMapping = {
    added: '+ ',
    deleted: '- ',
    unchanged: '  ',
    changed: '- ',
    nested: '',
  };

  const iter = (tree, depth = 1) => {
    let result = '';
    tree.forEach((obj) => {
      const prefix = countSpace(depth, typeMapping[obj.type]);
      const value = checkData(obj.type === 'changed' ? obj.oldValue : obj.value, depth);

      if (obj.type === 'changed') {
        const newValue = checkData(obj.newValue, depth);
        const newValuePrefix = countSpace(depth, '+ ');
        result += `${prefix}${obj.key}: ${value}\n${newValuePrefix}${obj.key}: ${newValue}\n`;
      } else if (obj.type === 'nested') {
        result += `${countSpace(depth)}${obj.key}: ${iter(obj.children, depth + 1)}\n`;
      } else {
        result += `${prefix}${obj.key}: ${value}\n`;
      }
    });

    return `{\n${result}${countSpace(depth - 1)}}`;
  };

  return iter(node, 1);
};

export default getformattedTree;
