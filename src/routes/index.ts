import { authMiddleware } from "@/middlewares/auth.middleware";
import { sessionRoutesModule } from "@/modules/sessions/routes";
import { userRoutesModule } from "@/modules/users/routes";
import { FastifyTypedInstance } from "@/types/types";

export const appRoutes = (app: FastifyTypedInstance) => {
  app.addHook("preHandler", authMiddleware);
  userRoutesModule(app);
};

export const sessionRoutes = (app: FastifyTypedInstance) => {
  sessionRoutesModule(app);
};
