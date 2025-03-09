"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const unauthorized_error_1 = require("@/error/unauthorized.error");
const authMiddleware = async (request, _) => {
    if (!request.headers?.authorization) {
        throw new unauthorized_error_1.UnauthorizedError();
    }
    try {
        await request.jwtVerify();
    }
    catch (error) {
        console.log(error);
        throw new unauthorized_error_1.UnauthorizedError();
    }
};
exports.authMiddleware = authMiddleware;
