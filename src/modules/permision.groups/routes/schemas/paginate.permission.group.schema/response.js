"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const helper_1 = require("@/utils/helper");
const zod_1 = require("zod");
exports.response = {
    200: zod_1.z.object({
        version: zod_1.z.string({ description: (0, helper_1.getVersion)() }),
        data: zod_1.z.object({
            items: zod_1.z.array(zod_1.z.object({
                id: zod_1.z.string({ description: '63b33f45-568a-4415-874f-b04a7bc39645' }),
                name: zod_1.z.string({ description: 'Administrador' }),
                description: zod_1.z.string({
                    description: 'Grupo com todas as permissões',
                }),
                createdAt: zod_1.z.date({ description: '2025-03-08T00:45:12.815Z' }),
                updatedAt: zod_1.z.date({ description: '2025-03-08T00:45:12.815Z' }),
            })),
            page: zod_1.z.number({ description: '1' }),
            qtdItemsPerPage: zod_1.z.number({ description: '10' }),
            total: zod_1.z.number({ description: '3' }),
        }),
    }),
    401: zod_1.z.object({
        message: zod_1.z.string().describe('Unauthorized'),
    }),
    422: zod_1.z.object({
        message: zod_1.z.string().describe('Unprocessable'),
    }),
    500: zod_1.z.object({
        message: zod_1.z.string().describe('Internal Server Error'),
    }),
};
