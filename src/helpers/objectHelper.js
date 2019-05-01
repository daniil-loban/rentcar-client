export function deepValue(obj, path) {
  for (let i=0, paths = path.split('.'), len = paths.length; i < len; i += 1){
    obj = obj[paths[i]];
    if (!obj) return obj 
  };
  return obj;
}