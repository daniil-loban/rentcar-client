export function deepValue(object, path) {
  let obj = { ...object };
  const paths = path.split('.');
  for (let i = 0; i < paths.length; i += 1) {
    obj = obj[paths[i]];
    if (!obj) return obj;
  }
  return obj;
}

export const some = () => null;
