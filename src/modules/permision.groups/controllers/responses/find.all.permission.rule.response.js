"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllPermissionRuleResponse = void 0;
const base_response_1 = require("@/shared/response/base.response");
class FindAllPermissionRuleResponse extends base_response_1.BaseResponse {
    static success({ permissionRules, reply, }) {
        const defaultData = this.setDefaultData(permissionRules);
        return reply.status(200).send(defaultData);
    }
    static error(error) {
        console.log('Error:', error);
        throw error;
    }
}
exports.FindAllPermissionRuleResponse = FindAllPermissionRuleResponse;
