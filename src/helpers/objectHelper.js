export function deepValue(object, path) {
  let obj = { ...object };
  const paths = path.split('.');
  for (let i = 0; i < paths.length; i += 1) {
    obj = obj[paths[i]];
    if (!obj) return obj;
  }
  return obj;
}

const getFlatObject = (obj, path = '') => {
  return Object.keys(obj).reduce((acc, e) => {
    if (obj[e] instanceof Object) {
      const temp = getFlatObject(
        obj[e],
        `${path}${path === '' ? '' : '.'}${e}`
      );
      Object.keys(temp).forEach(inner => {
        acc[`${inner}`] = temp[inner];
      });
    } else {
      acc[`${path}${path === '' ? '' : '.'}${e}`] = obj[e];
    }
    return acc;
  }, {});
};

const sortByType = arr => {
  if (typeof arr[0] === 'number') {
    return (a, b) => a - b;
  }
  return (a, b) => (a >= b ? 1 : -1);
};

export function agregateValuesListObjects(arr) {
  if (!arr) return null;
  const result = arr.reduce((acc, e) => {
    const flat = getFlatObject(e);
    Object.keys(flat).forEach(path => {
      if (acc[path]) {
        if (!acc[path].includes(flat[path]))
          acc[path] = acc[path].concat(flat[path]);
      } else {
        acc[path] = [flat[path]];
      }
    });
    return acc;
  }, {});

  Object.keys(result).forEach(key => {
    result[key] = result[key].sort(sortByType(arr));
  });
  return result;
}
