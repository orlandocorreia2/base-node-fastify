"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.positiveNumber = exports.parseInteger = exports.getVersion = void 0;
const package_json_1 = __importDefault(require("../../package.json"));
const getVersion = () => {
    return process.env.npm_package_version || package_json_1.default.version;
};
exports.getVersion = getVersion;
const parseInteger = (value) => {
    return parseInt(value.toString());
};
exports.parseInteger = parseInteger;
const positiveNumber = (value) => {
    if (!value)
        return 1;
    value = value.toString().replace(/\D/, '');
    if (!value)
        return 1;
    value = (0, exports.parseInteger)(value);
    if (value < 1)
        return 1;
    return value;
};
exports.positiveNumber = positiveNumber;
