export interface ModelCreateInterface {
  create({ data }: { data: any }): Promise<any>;
  findUnique(data: any): Promise<any>;
}
