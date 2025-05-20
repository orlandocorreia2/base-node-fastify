export const convertDecimal = (value: string) => {
  return parseFloat(value.replace(/\./g, '').replace(/\,/g, '.'));
};

export const convertInteger = (value: string) => {
  return parseInt(value.replace(/\./g, '').replace(/\,/g, ''));
};

export const serializeBigInt = (value: string | number) => {
  return parseInt(value.toString());
};
