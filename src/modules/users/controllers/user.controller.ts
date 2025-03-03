import { FastifyReply } from "fastify";

export class UserController {
  async create(_, reply: FastifyReply) {
    reply.send({ message: "Usuário Criado" });
  }

  async findAll(_, reply: FastifyReply) {
    reply.send({ message: "Todos Usuários" });
  }

  async findOne(_, reply: FastifyReply) {
    reply.send({ message: "Um usuário" });
  }

  async update(_, reply: FastifyReply) {
    reply.send({ message: "Atualizando um usuário" });
  }

  async delete(_, reply: FastifyReply) {
    reply.send({ message: "EXcluindo um usuário" });
  }
}
