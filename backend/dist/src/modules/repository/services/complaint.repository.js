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
exports.ComplaintRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const complaint_entity_1 = require("../../../database/entities/complaint.entity");
let ComplaintRepository = class ComplaintRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(complaint_entity_1.ComplaintEntity, dataSource.manager);
        this.dataSource = dataSource;
    }
    async getListForVenue(venueId, query) {
        const qb = this.createQueryBuilder('complaint');
        qb.leftJoinAndSelect('complaint.user', 'user');
        qb.leftJoinAndSelect('complaint.venue', 'venue');
        qb.where('complaint.venue_id = :venueId', { venueId });
        if (query.status) {
            qb.andWhere('complaint.status = :status', { status: query.status });
        }
        if (query.type) {
            qb.andWhere('complaint.type = :type', { type: query.type });
        }
        if (query.fromDate) {
            qb.andWhere('complaint.created >= :from', { from: query.fromDate });
        }
        if (query.toDate) {
            qb.andWhere('complaint.created <= :to', { to: query.toDate });
        }
        qb.orderBy('complaint.created', 'DESC');
        qb.take(query.limit);
        qb.skip(query.offset);
        return await qb.getManyAndCount();
    }
    async getAdminList(query) {
        const qb = this.createQueryBuilder('complaint');
        qb.leftJoinAndSelect('complaint.user', 'user');
        qb.leftJoinAndSelect('complaint.venue', 'venue');
        if (query.venueId) {
            qb.andWhere('complaint.venue_id = :venueId', { venueId: query.venueId });
        }
        if (query.userId) {
            qb.andWhere('complaint.user_id = :userId', { userId: query.userId });
        }
        if (query.status) {
            qb.andWhere('complaint.status = :status', { status: query.status });
        }
        if (query.type) {
            qb.andWhere('complaint.type = :type', { type: query.type });
        }
        if (query.fromDate) {
            qb.andWhere('complaint.created >= :from', { from: query.fromDate });
        }
        if (query.toDate) {
            qb.andWhere('complaint.created <= :to', { to: query.toDate });
        }
        qb.orderBy('complaint.created', 'DESC');
        qb.take(query.limit);
        qb.skip(query.offset);
        return await qb.getManyAndCount();
    }
};
exports.ComplaintRepository = ComplaintRepository;
exports.ComplaintRepository = ComplaintRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ComplaintRepository);
//# sourceMappingURL=complaint.repository.js.map