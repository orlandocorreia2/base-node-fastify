"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = void 0;
const zod_1 = require("zod");
exports.body = zod_1.z.object({
    email: zod_1.z
        .string({ message: "User email is required." })
        .email({ message: "User email must be type of email." })
        .describe("johndoe@email.com"),
    password: zod_1.z
        .string({ message: "User password is required." })
        .min(8, { message: "User password is invalid." }).describe("6rx2@AGFS9I"),
});
