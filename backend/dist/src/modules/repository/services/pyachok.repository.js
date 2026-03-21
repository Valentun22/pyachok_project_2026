"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PyachokRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const pyachok_entity_1 = require("../../../database/entities/pyachok.entity");
const pyachok_status_enum_1 = require("../../pyachok/enums/pyachok-status.enum");
let PyachokRepository = class PyachokRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(pyachok_entity_1.PyachokEntity, dataSource.manager);
        this.dataSource = dataSource;
    }
    async getVenuePublicList(venueId, query) {
        const qb = this.createQueryBuilder('p');
        qb.leftJoinAndSelect('p.user', 'user');
        qb.andWhere('p.venue_id = :venueId', { venueId });
        qb.andWhere('p.status = :status', { status: pyachok_status_enum_1.PyachokStatusEnum.OPEN });
        qb.andWhere('p.date >= CURRENT_DATE');
        if (query.date) {
            qb.andWhere('p.date = :date', { date: query.date });
        }
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        qb.take(limit);
        qb.skip(skip);
        qb.orderBy('p.created', 'DESC');
        return await qb.getManyAndCount();
    }
    async getVenueManageList(venueId, query) {
        const qb = this.createQueryBuilder('p');
        qb.leftJoinAndSelect('p.user', 'user');
        qb.andWhere('p.venue_id = :venueId', { venueId });
        if (query.status === pyachok_status_enum_1.PyachokStatusEnum.OPEN) {
            qb.andWhere('p.status = :status', { status: pyachok_status_enum_1.PyachokStatusEnum.OPEN });
        }
        if (query.status === pyachok_status_enum_1.PyachokStatusEnum.CLOSED) {
            qb.andWhere('p.status = :status', { status: pyachok_status_enum_1.PyachokStatusEnum.CLOSED });
        }
        if (query.date) {
            qb.andWhere('p.date = :date', { date: query.date });
        }
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        qb.take(limit);
        qb.skip(skip);
        qb.orderBy('p.created', 'DESC');
        return await qb.getManyAndCount();
    }
    async getOpenFeed(query) {
        const qb = this.createQueryBuilder('p');
        qb.leftJoinAndSelect('p.user', 'user');
        qb.leftJoinAndSelect('p.venue', 'venue');
        qb.andWhere('p.status = :status', { status: pyachok_status_enum_1.PyachokStatusEnum.OPEN });
        qb.andWhere('p.date >= CURRENT_DATE');
        if (query.date) {
            qb.andWhere('p.date = :date', { date: query.date });
        }
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        qb.take(limit);
        qb.skip(skip);
        qb.orderBy('p.created', 'DESC');
        return await qb.getManyAndCount();
    }
};
exports.PyachokRepository = PyachokRepository;
exports.PyachokRepository = PyachokRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], PyachokRepository);
//# sourceMappingURL=pyachok.repository.js.map