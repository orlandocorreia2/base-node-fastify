import { container } from "tsyringe";
import { FastifyTypedInstance } from "@/types/types";
import { SessionController } from "../controllers/session.controller";
import { createSessionSchema } from "./schemas/create.session.schema";

export const sessionRoutesModule = (app: FastifyTypedInstance) => {
  const sessionController = container.resolve(SessionController);

  app.post("/login", { schema: createSessionSchema }, (request, reply) =>
    sessionController.create(request, reply),
  );
};
