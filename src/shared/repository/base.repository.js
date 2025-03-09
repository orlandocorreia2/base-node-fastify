"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    _infraRepositoryInfra = {};
    async create(data) {
        return await this._infraRepositoryInfra.create({ data });
    }
    async createMany(data) {
        return await this._infraRepositoryInfra.createMany({ data });
    }
    async findOne(data) {
        return await this._infraRepositoryInfra.findOne(data);
    }
    async findMany() {
        return await this._infraRepositoryInfra.findMany();
    }
    async paginate({ page, qtdItemsPerPage, }) {
        return await this._infraRepositoryInfra.paginate({
            page,
            qtdItemsPerPage,
        });
    }
}
exports.BaseRepository = BaseRepository;
