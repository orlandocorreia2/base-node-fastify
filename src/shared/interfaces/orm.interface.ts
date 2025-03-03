export interface ORMInterface {
  create(data: any): Promise<any>;
}
