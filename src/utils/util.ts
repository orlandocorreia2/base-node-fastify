import { z } from 'zod';
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

export const validateEmail = (email: string): boolean => {
  // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  try {
    z.string().email().parse(email);
  } catch (error) {
    throw new Error('Invalid email format');
  }
  return true;
};
