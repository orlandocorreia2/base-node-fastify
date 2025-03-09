"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionGroupRoutesModule = void 0;
const tsyringe_1 = require("tsyringe");
const permission_group_controller_1 = require("../controllers/permission.group.controller");
const create_permission_group_schema_1 = require("./schemas/create.permission.group.schema");
const auth_middleware_1 = require("@/middlewares/auth.middleware");
const permission_rule_controller_1 = require("../controllers/permission.rule.controller");
const find_all_permission_rule_schema_1 = require("./schemas/find.all.permission.rule.schema");
const paginate_permission_group_schema_1 = require("./schemas/paginate.permission.group.schema");
const permissionGroupRoutesModule = (app) => {
    const permissionGroupController = tsyringe_1.container.resolve(permission_group_controller_1.PermissionGroupController);
    const permissionRuleController = tsyringe_1.container.resolve(permission_rule_controller_1.PermissionRuleController);
    app.post('/permission-groups', { schema: create_permission_group_schema_1.createPermissionGroupSchema, preHandler: auth_middleware_1.authMiddleware }, (request, reply) => permissionGroupController.create(request, reply));
    app.get('/permission-groups', { schema: paginate_permission_group_schema_1.paginatePermissionGroupSchema, preHandler: auth_middleware_1.authMiddleware }, (request, reply) => permissionGroupController.findAll(request, reply));
    app.get('/permission-rules', { schema: find_all_permission_rule_schema_1.findAllPermissionRulesSchema, preHandler: auth_middleware_1.authMiddleware }, (request, reply) => permissionRuleController.findAll(request, reply));
};
exports.permissionGroupRoutesModule = permissionGroupRoutesModule;
