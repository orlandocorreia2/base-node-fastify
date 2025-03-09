"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("./jwt"));
const cors_1 = __importDefault(require("./cors"));
const swagger_1 = __importDefault(require("./swagger"));
exports.default = {
    jwt: jwt_1.default,
    cors: cors_1.default,
    swagger: swagger_1.default,
};
