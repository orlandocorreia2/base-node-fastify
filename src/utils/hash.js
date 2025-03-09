"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHash = exports.generateHash = void 0;
const bcryptjs_1 = require("bcryptjs");
const generateHash = (password) => {
    return (0, bcryptjs_1.hash)(password, 10);
};
exports.generateHash = generateHash;
const verifyHash = (password, hash) => {
    return (0, bcryptjs_1.compare)(password, hash);
};
exports.verifyHash = verifyHash;
