import { FindManyParametersProps } from '../../../../../types/db';

export interface ModelInterface {
  create({ data }: { data: any }): Promise<any>;
  createMany({ data }: { data: any }): Promise<any>;
  findFirst(data: any): Promise<any>;
  findMany({ skip, take }: FindManyParametersProps): Promise<any>;
  count(): Promise<number>;
}
