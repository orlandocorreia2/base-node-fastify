"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const routes_1 = require("@/modules/permision.groups/routes");
const routes_2 = require("@/modules/sessions/routes");
const routes_3 = require("@/modules/users/routes");
const appRoutes = (app) => {
    (0, routes_3.userRoutesModule)(app);
    (0, routes_2.sessionRoutesModule)(app);
    (0, routes_1.permissionGroupRoutesModule)(app);
};
exports.appRoutes = appRoutes;
