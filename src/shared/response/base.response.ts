import { PaginateProps } from '@/types/db';
import { getVersion } from '@/utils/helper';

export class BaseResponse {
  static setPaginateData(data: PaginateProps) {
    return { version: getVersion(), data };
  }

  static setDefaultData(data: any) {
    return { version: getVersion(), data };
  }
}
