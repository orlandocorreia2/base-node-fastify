"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllPermissionGroupResponse = void 0;
const base_response_1 = require("@/shared/response/base.response");
class FindAllPermissionGroupResponse extends base_response_1.BaseResponse {
    static success({ paginatePermissionGroups, reply, }) {
        const defaultData = this.setPaginateData(paginatePermissionGroups);
        return reply.status(200).send(defaultData);
    }
    static error(error) {
        console.log('Error:', error);
        throw error;
    }
}
exports.FindAllPermissionGroupResponse = FindAllPermissionGroupResponse;
