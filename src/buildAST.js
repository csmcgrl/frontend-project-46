import _ from 'lodash';

const buildAST = (file1, file2) => {
  const keys = _.union(_.keys(file1), _.keys(file2)).slice().sort();

  return keys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (!_.has(file2, key)) {
      return { key, type: 'deleted', value: value1 };
    }
    if (!_.has(file1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, type: 'nested', children: buildAST(value1, value2) };
    }
    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 };
    }
    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    };
  });
};

export default buildAST;
