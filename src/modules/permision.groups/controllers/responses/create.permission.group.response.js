"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePermissionGroupResponse = void 0;
class CreatePermissionGroupResponse {
    static success({ reply }) {
        return reply.status(201).send();
    }
    static error(error) {
        console.log('Error:', error);
        throw error;
    }
}
exports.CreatePermissionGroupResponse = CreatePermissionGroupResponse;
