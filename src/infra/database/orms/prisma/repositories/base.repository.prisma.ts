import { BaseRepositoryInterface } from "../../../../../shared/repository/interfaces/base.repository.interface";
import { ModelCreateInterface } from "../interfaces/model.create.interface.prisma";

export class BaseRepositoryPrisma implements BaseRepositoryInterface {
  protected _model: ModelCreateInterface = {} as ModelCreateInterface;

  async create({ data }: { data: any }): Promise<any> {
    const result = await this._model.create({
      data,
    });
    return result;
  }
}
