"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionSchema = void 0;
const body_1 = require("./body");
const response_1 = require("./response");
exports.createSessionSchema = {
    tags: ["Sessions"],
    description: "Create a new session",
    body: body_1.body,
    response: response_1.response,
};
