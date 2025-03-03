import { BaseRepositoryInterface } from "./interfaces/base.repository.interface";

export class BaseRepository implements BaseRepositoryInterface {
  protected _infraRepositoryInfra: BaseRepositoryInterface =
    {} as BaseRepositoryInterface;

  async create(data: any): Promise<any> {
    console.log("criando um registro");
    this._infraRepositoryInfra.create({ data });
    return "";
  }
}
