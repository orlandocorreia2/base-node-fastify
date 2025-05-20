import 'dotenv/config';
import { EnvProps } from '../types/env';

export const env = ({ key, defaultValue = '' }: EnvProps): string => {
  const envValue = process.env[key] || defaultValue;
  return envValue.toString();
};

export const envNumber = ({ key, defaultValue = 0 }: EnvProps): number => {
  const envValue = process.env[key] || defaultValue;
  return parseInt(envValue.toString());
};

export const envBoolean = ({
  key,
  defaultValue = false,
}: EnvProps): boolean => {
  const envValue = process.env[key] || defaultValue;
  return envValue === 'true';
};
