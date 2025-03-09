"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const zod_1 = require("zod");
exports.response = {
    201: zod_1.z.null().describe("No content"),
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
