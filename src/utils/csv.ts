import fs from 'fs';
import csv from 'csv-parser';

export const getDataExtraction = ({ filePath, fn, separator = ';' }: any) => {
  return new Promise((resolve, _) => {
    const response: any[] = [];
    let index = 0;
    fs.createReadStream(filePath, 'latin1')
      .pipe(csv({ separator }))
      .on('data', data => {
        response.push(data);
        fn(data, index);
        index++;
      })
      .on('end', () => {
        resolve(response);
      });
  });
};
