import { TokenProps } from '../types/token';

export interface TokenRepositoryInterface {
  create(token: string): Promise<TokenProps>;
  findOne(token: string): Promise<TokenProps>;
  delete(id: string): Promise<void>;
}
