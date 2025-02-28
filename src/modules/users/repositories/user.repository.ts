import { prisma } from "../../../infra/database/prisma/client";
import { BaseRepository } from "../../../repository/base.repository";

export class UserRepository extends BaseRepository {
  async create(): Promise<any> {
    const result = await prisma.user.create({
      data: {
        name: "Orlando Nascimento",
        email: "ocnascimento2@gmail.com",
      },
    });
    return result;
  }
}
