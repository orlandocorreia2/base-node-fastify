export interface BaseRepositoryInterface {
  findOne(data: any): Promise<any>;
  create(data: any): Promise<any>;
  createMany(data: any): Promise<any>;
  findMany(): Promise<any>;
}
