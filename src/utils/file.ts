import fs from 'fs';

export const deleteFile = (filePath: string, fnError = () => {}) => {
  console.log('Deleting file...', filePath);
  fs.unlink(filePath, function (err) {
    if (err) fnError();
    console.log('File deleted...');
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
    console.log('File saved on disk...');
    fn();
  });
};
