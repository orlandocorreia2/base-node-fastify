"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPermissionGroupSchema = void 0;
const body_1 = require("./body");
const response_1 = require("./response");
exports.createPermissionGroupSchema = {
    tags: ['Permission Group'],
    description: 'Create a new permission group',
    body: body_1.body,
    response: response_1.response,
};
