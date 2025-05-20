import { injectable } from 'tsyringe';
import { TokenRepositoryInterface } from 'shared/interfaces/token.repository.interface';
import { TokenProps } from '../../../../../shared/types/token';
import { prisma } from '../client';

@injectable()
export class TokenRepositoryPrisma implements TokenRepositoryInterface {
  async create(token: string): Promise<TokenProps> {
    return (await prisma.token.create({ data: { token } })) as TokenProps;
  }

  async findOne(token: string): Promise<TokenProps> {
    return (await prisma.token.findFirst({ where: { token } })) as TokenProps;
  }

  async delete(id: string): Promise<void> {
    await prisma.token.delete({ where: { id } });
  }
}
