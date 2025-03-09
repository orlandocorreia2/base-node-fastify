"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponse = void 0;
const helper_1 = require("@/utils/helper");
class BaseResponse {
    static setPaginateData(data) {
        return { version: (0, helper_1.getVersion)(), data };
    }
    static setDefaultData(data) {
        return { version: (0, helper_1.getVersion)(), data };
    }
}
exports.BaseResponse = BaseResponse;
