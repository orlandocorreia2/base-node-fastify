import {
  DBCreateManyParameterProps,
  DBCreateParameterProps,
  DBDeleteParameterProps,
  DBFindFirstParameterProps,
  DBFindManyParametersProps,
  DBUpdateParameterProps,
} from 'types/db';

export interface ModelInterface {
  create({ data }: DBCreateParameterProps): Promise<unknown>;
  createMany({ data }: DBCreateManyParameterProps): Promise<unknown>;
  findFirst({ where }: DBFindFirstParameterProps): Promise<unknown>;
  findMany({ where }: DBFindManyParametersProps): Promise<unknown>;
  update({ data, where }: DBUpdateParameterProps): Promise<unknown>;
  delete({ where }: DBDeleteParameterProps): Promise<unknown>;
}
