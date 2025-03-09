"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const zod_1 = require("zod");
exports.response = {
    201: zod_1.z.object({
        token: zod_1.z.string().describe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxMTA4Y2Q5LTAzMDMtNDgxNS1hNTVmLWRmZGRjNzI5NThiMCIsImVtYWlsIjoib2NuYXNjaW1lbnRvMkBnbWFpbC5jb20iLCJuYW1lIjoiT3JsYW5kbyBOYXNjaW1lbnRvIiwiaWF0IjoxNzQxMTgyMjY2LCJleHAiOjE3NDExODU4NjZ9.Tt7gBnAeRe_GBjpGyl0WWxTUHOeCJmeOr_kNac9GkC8"),
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
