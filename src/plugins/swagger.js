"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    await fastify.register(swagger_1.default, {
        openapi: {
            info: {
                title: "Typed API",
                version: "1.0.0",
            },
        },
        transform: fastify_type_provider_zod_1.jsonSchemaTransform,
    });
    await fastify.register(swagger_ui_1.default, {
        routePrefix: "/docs",
    });
});
