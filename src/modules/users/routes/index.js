"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutesModule = void 0;
const tsyringe_1 = require("tsyringe");
const user_controller_1 = require("../controllers/user.controller");
const create_user_schema_1 = require("./schemas/create.user.schema");
const userRoutesModule = (app) => {
    const userController = tsyringe_1.container.resolve(user_controller_1.UserController);
    app.post('/users', { schema: create_user_schema_1.createUserSchema }, (request, reply) => userController.create(request, reply));
    // app.get(
    //   '/users/profile',
    //   { schema: profileUserSchema, preHandler: authMiddleware },
    //   request => {
    //     return request.user;
    //   },
    // );
};
exports.userRoutesModule = userRoutesModule;
