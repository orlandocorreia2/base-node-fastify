import XLSX from 'xlsx';
import { MultipartFile } from '@fastify/multipart';

export const getRows = async (multipartData: MultipartFile): Promise<any[]> => {
  const buffer = await multipartData.toBuffer();
  const file = XLSX.read(buffer);
  return XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
};
