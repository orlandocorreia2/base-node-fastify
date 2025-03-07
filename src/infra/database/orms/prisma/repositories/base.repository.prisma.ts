import { BaseRepositoryInterface } from '@/shared/repository/interfaces/base.repository.interface';
import { ModelInterface } from '../interfaces/model.create.interface.prisma';

export class BaseRepositoryPrisma implements BaseRepositoryInterface {
  protected _model: ModelInterface = {} as ModelInterface;

  async create({ data }: { data: any }): Promise<any> {
    const result = await this._model.create({
      data,
    });
    return result;
  }

  async findOne(data: any): Promise<any> {
    return await this._model.findFirst({ where: data });
  }

  async findMany(): Promise<any> {
    const result = await this._model.findMany();
    return result;
  }
}
