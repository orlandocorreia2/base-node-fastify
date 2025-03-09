"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepositoryPrisma = void 0;
const helper_1 = require("@/utils/helper");
class BaseRepositoryPrisma {
    _model = {};
    async create({ data }) {
        return (await this._model.create({
            data,
        }));
    }
    async createMany({ data }) {
        return (await this._model.createMany({
            data,
        }));
    }
    async findOne(data) {
        return (await this._model.findFirst({ where: data }));
    }
    async findMany() {
        return (await this._model.findMany({}));
    }
    async paginate({ page, qtdItemsPerPage, }) {
        const total = await this._model.count();
        page = (0, helper_1.positiveNumber)(page);
        qtdItemsPerPage = (0, helper_1.positiveNumber)(qtdItemsPerPage);
        const skip = (page - 1) * qtdItemsPerPage;
        const dataResult = await this._model.findMany({
            skip,
            take: parseInt(qtdItemsPerPage.toString()),
        });
        return { items: dataResult, page, qtdItemsPerPage, total };
    }
}
exports.BaseRepositoryPrisma = BaseRepositoryPrisma;
