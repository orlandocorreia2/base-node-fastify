import { userRoutes } from "@/modules/users/routes";
import { FastifyTypedInstance } from "@/types/types";

export const appRoutes = (app: FastifyTypedInstance) => {
  userRoutes(app);
};
