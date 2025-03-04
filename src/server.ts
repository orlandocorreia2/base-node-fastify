import "reflect-metadata";
import "dotenv/config";

import { env, envNumber } from "./utils/env";
import { createApp } from "./app";

(() => {
  const app = createApp();

  const port = envNumber({ key: "PORT" });
  const host = env({ key: "HOST" });

  app.listen({ port, host }, (error) => {
    if (error) {
      console.log("Erro fatal!", error);
      process.exit(1);
    }
    console.log(`Server is running on port ${port}`);
  });
})();
