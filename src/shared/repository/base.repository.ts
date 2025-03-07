import { BaseRepositoryInterface } from './interfaces/base.repository.interface';

export class BaseRepository implements BaseRepositoryInterface {
  protected _infraRepositoryInfra: BaseRepositoryInterface =
    {} as BaseRepositoryInterface;

  async create(data: any): Promise<any> {
    return await this._infraRepositoryInfra.create({ data });
  }

  async createMany(data: any): Promise<any> {
    return await this._infraRepositoryInfra.createMany({ data });
  }

  async findOne(data: any): Promise<any> {
    return await this._infraRepositoryInfra.findOne(data);
  }

  async findMany(): Promise<any> {
    return await this._infraRepositoryInfra.findMany();
  }
}
