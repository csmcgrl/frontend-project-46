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
  const iter = (tree, depth = 1) => {
    let result = '';
    tree.forEach((obj) => {
      switch (obj.type) {
        case 'added':
          result += `${countSpace(depth, '+ ')}${obj.key}: ${checkData(obj.value, depth)}\n`;
          break;
        case 'deleted':
          result += `${countSpace(depth, '- ')}${obj.key}: ${checkData(obj.value, depth)}\n`;
          break;

        case 'unchanged':
          result += `${countSpace(depth)}${obj.key}: ${checkData(obj.value, depth)}\n`;
          break;
        case 'changed':
          result += `${countSpace(depth, '- ')}${obj.key}: ${checkData(obj.oldValue, depth)}\n${countSpace(depth, '+ ')}${obj.key}: ${checkData(obj.newValue, depth)}\n`;
          break;
        case 'nested':
          result += `${countSpace(depth)}${obj.key}: ${iter(obj.children, depth + 1)}\n`;
          break;
        default:
          console.log('No such type');
      }
    });
    return `{\n${result}${countSpace(depth - 1)}}`;
  };
  return iter(node, 1);
};

export default getformattedTree;
