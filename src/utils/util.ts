export const sleep = (time: number = 1) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time * 1000);
  });
};
