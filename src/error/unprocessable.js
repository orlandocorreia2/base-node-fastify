"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableError = void 0;
class UnprocessableError extends Error {
    status = 422;
    constructor(message = 'Unprocessable') {
        super(message);
        this.name = 'UnprocessableError';
    }
}
exports.UnprocessableError = UnprocessableError;
