"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const env_1 = require("./utils/env");
const app_1 = require("./app");
(() => {
    const port = (0, env_1.envNumber)({ key: "PORT" });
    const host = (0, env_1.env)({ key: "HOST" });
    app_1.app.listen({ port, host }, (error) => {
        if (error) {
            console.log("Erro fatal!", error);
            process.exit(1);
        }
        console.log(`Server is running on port ${port}`);
    });
})();
