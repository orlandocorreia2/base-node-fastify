"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("./routes");
require("./shared/container");
const plugins_1 = __importDefault(require("plugins"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const app = (0, fastify_1.default)({
    logger: false,
}).withTypeProvider();
exports.app = app;
(() => {
    app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
    app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
    app.register(plugins_1.default.jwt);
    app.register(plugins_1.default.cors);
    app.register(plugins_1.default.swagger);
    app.register(routes_1.appRoutes);
})();
