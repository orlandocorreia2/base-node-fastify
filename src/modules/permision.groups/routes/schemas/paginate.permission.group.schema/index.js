"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatePermissionGroupSchema = void 0;
const querystring_1 = require("./querystring");
const response_1 = require("./response");
exports.paginatePermissionGroupSchema = {
    tags: ['Permission Group'],
    description: 'Paginate permission groups',
    querystring: querystring_1.querystring,
    response: response_1.response,
};
