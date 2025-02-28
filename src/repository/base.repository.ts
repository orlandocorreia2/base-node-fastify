import { BaseRepositoryInterface } from "./interfaces/base.repository";

export class BaseRepository implements BaseRepositoryInterface {
  async create(): Promise<any> {
    console.log("criando um registro");
    return "";
  }
}
