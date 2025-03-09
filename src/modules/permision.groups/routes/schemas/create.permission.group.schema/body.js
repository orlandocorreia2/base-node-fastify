"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = void 0;
const zod_1 = require("zod");
exports.body = zod_1.z.object({
    name: zod_1.z
        .string({ message: 'User name is required.', description: 'John Doe' })
        .min(3, { message: 'User name is invalid.' }),
    description: zod_1.z.string().optional(),
    permissionRulesId: zod_1.z.array(zod_1.z.string({ description: '63b33f45-568a-4415-874f-b04a7bc39645' })),
});
