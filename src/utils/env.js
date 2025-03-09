"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envNumber = exports.env = void 0;
const env = ({ key, defaultValue = "" }) => {
    const envValue = process.env[key] || defaultValue;
    return envValue.toString();
};
exports.env = env;
const envNumber = ({ key, defaultValue = 0 }) => {
    const envValue = process.env[key] || defaultValue;
    return parseInt(envValue.toString());
};
exports.envNumber = envNumber;
