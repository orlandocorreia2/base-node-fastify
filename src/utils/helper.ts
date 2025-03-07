import packageJson from '../../package.json';

export const getVersion = (): string => {
  return process.env.npm_package_version || packageJson.version;
};
