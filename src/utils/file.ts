import fs from 'fs';

export const deleteFile = (filePath: string, fnError = () => {}) => {
  console.warn('Deleting file...', filePath);
  fs.unlink(filePath, function (err) {
    if (err) fnError();
    console.warn('File deleted...');
  });
};

export const writeFile = (
  filePath: string,
  buffer: Buffer<ArrayBufferLike>,
  fnError = () => {},
  fn = () => {},
) => {
  fs.writeFile(filePath, buffer, function (error) {
    if (error) {
      console.error(error);
      fnError();
    }
    console.warn('File saved on disk...');
    fn();
  });
};
