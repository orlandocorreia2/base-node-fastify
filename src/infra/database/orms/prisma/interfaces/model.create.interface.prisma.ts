export interface ModelInterface {
  create({ data }: { data: any }): Promise<any>;
  createMany({ data }: { data: any }): Promise<any>;
  findFirst(data: any): Promise<any>;
  findMany(): Promise<any>;
}
