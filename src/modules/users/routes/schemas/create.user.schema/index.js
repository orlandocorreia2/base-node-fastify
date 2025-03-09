"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const body_1 = require("./body");
const response_1 = require("./response");
exports.createUserSchema = {
    tags: ["Users"],
    description: "Create a new user",
    body: body_1.body,
    response: response_1.response,
};
