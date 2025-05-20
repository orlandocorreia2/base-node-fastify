import { compare, hash } from "bcryptjs";

export const generateHash = (password: string): Promise<string> => {
  return hash(password, 10);
};

export const verifyHash = (
  password: string,
  hash: string,
): Promise<boolean> => {
  return compare(password, hash);
};
