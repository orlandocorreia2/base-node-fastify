export interface ModelCreateInterface {
  create({ data }: { data: any }): Promise<any>;
  findFirst(data: any): Promise<any>;
}
