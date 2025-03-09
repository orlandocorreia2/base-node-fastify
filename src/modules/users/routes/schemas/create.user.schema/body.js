"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = void 0;
const zod_1 = require("zod");
exports.body = zod_1.z.object({
    name: zod_1.z
        .string({ message: "User name is required." })
        .describe("John Doe")
        .min(3, { message: "User name is invalid." }),
    email: zod_1.z
        .string({ message: "User email is required." })
        .email({ message: "User email must be type of email." })
        .describe("johndoe@email.com")
});
