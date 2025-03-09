"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutesModule = void 0;
const tsyringe_1 = require("tsyringe");
const session_controller_1 = require("../controllers/session.controller");
const create_session_schema_1 = require("./schemas/create.session.schema");
const sessionRoutesModule = (app) => {
    const sessionController = tsyringe_1.container.resolve(session_controller_1.SessionController);
    app.post("/login", { schema: create_session_schema_1.createSessionSchema }, (request, reply) => sessionController.create(request, reply));
};
exports.sessionRoutesModule = sessionRoutesModule;
