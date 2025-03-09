"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const zod_1 = require("zod");
exports.response = {
    200: zod_1.z.object({
        id: zod_1.z.string().describe("21108cd9-0303-4815-a55f-dfddc72958b0"),
        email: zod_1.z.string().describe("johndoe@email.com"),
        name: zod_1.z.string().describe("Jonh Doe")
    }),
    401: zod_1.z.object({
        message: zod_1.z.string().describe("Unauthorized"),
    }),
    422: zod_1.z.object({
        message: zod_1.z.string().describe("Unprocessable"),
    }),
    500: zod_1.z.object({
        message: zod_1.z.string().describe("Internal Server Error"),
    }),
};
