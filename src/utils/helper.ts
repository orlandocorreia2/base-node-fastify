import packageJson from '../../package.json';

export const getVersion = (): string => {
  return process.env.npm_package_version || packageJson.version;
};

export const parseInteger = (value: number | string) => {
  return parseInt(value.toString());
};

export const positiveNumber = (value?: string | number) => {
  if (!value) return 1;
  value = value.toString().replace(/\D/, '');
  if (!value) return 1;
  value = parseInteger(value);
  if (value < 1) return 1;
  return value;
};
