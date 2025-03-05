import { sessionRoutesModule } from "@/modules/sessions/routes";
import { userRoutesModule } from "@/modules/users/routes";
import { FastifyTypedInstance } from "@/types/types";

export const appRoutes = (app: FastifyTypedInstance) => {
  userRoutesModule(app);
  sessionRoutesModule(app);
};

