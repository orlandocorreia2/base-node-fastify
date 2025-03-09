"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querystring = void 0;
const zod_1 = require("zod");
exports.querystring = zod_1.z.object({
    page: zod_1.z
        .string({ message: 'Page is required.', description: '1' })
        .default('1'),
    qtdItemsPerPage: zod_1.z
        .string({ message: 'Qtd item per page is required.', description: '10' })
        .default('10'),
});
