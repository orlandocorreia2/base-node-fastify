import { getVersion } from '../../utils/helper';

export class BaseResponse {
  static setPaginateData<T>(data: T) {
    return { version: getVersion(), data };
  }

  static setDefaultData(data: unknown) {
    return { version: getVersion(), data };
  }
}
