import { KeyValueProps } from 'types/types';

export const sleep = (time: number = 1) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time * 1000);
  });
};

export function trimObject<T>(obj: Record<string, any>): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const trimmedObj: KeyValueProps = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      trimmedObj[key] = value;
      if (typeof value === 'string') trimmedObj[key] = value.trim();
      if (typeof value === 'object' && value !== null)
        trimmedObj[key] = trimObject(value);
    }
  }
  return trimmedObj as T;
}
