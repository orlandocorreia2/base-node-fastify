import { EnvProps } from "../types/env";

export const env = ({ key, defaultValue = "" }: EnvProps) => {
  const envValue = process.env[key] || defaultValue;
  return envValue.toString();
};

export const envNumber = ({ key, defaultValue = 0 }: EnvProps) => {
  const envValue = process.env[key] || defaultValue;
  return parseInt(envValue.toString());
};
