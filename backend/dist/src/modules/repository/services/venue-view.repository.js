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
exports.VenueViewRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const venue_view_entity_1 = require("../../../database/entities/venue-view.entity");
let VenueViewRepository = class VenueViewRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(venue_view_entity_1.VenueViewEntity, dataSource.manager);
        this.dataSource = dataSource;
    }
    async logView(params) {
        await this.save(this.create({
            venue_id: params.venueId,
            user_id: params.userId ?? null,
            ip: params.ip ?? null,
            userAgent: params.userAgent ?? null,
        }));
    }
    async getViewsSummary(venueId, from, to) {
        const qb = this.createQueryBuilder('vv').where('vv.venue_id = :venueId', {
            venueId,
        });
        if (from)
            qb.andWhere('vv.created >= :from', { from });
        if (to)
            qb.andWhere('vv.created <= :to', { to });
        const total = await qb.getCount();
        const uniqueUsersRow = await qb
            .clone()
            .select('COUNT(DISTINCT vv.user_id)', 'cnt')
            .getRawOne();
        const uniqueIpsRow = await qb
            .clone()
            .select('COUNT(DISTINCT vv.ip)', 'cnt')
            .getRawOne();
        return {
            total,
            uniqueUsers: Number(uniqueUsersRow?.cnt ?? 0),
            uniqueIps: Number(uniqueIpsRow?.cnt ?? 0),
        };
    }
    async getViewsTimeSeries(venueId, bucket, from, to) {
        const qb = this.createQueryBuilder('vv')
            .select(`date_trunc('${bucket}', vv.created)`, 'bucket')
            .addSelect('COUNT(*)', 'count')
            .where('vv.venue_id = :venueId', { venueId });
        if (from)
            qb.andWhere('vv.created >= :from', { from });
        if (to)
            qb.andWhere('vv.created <= :to', { to });
        qb.groupBy('bucket').orderBy('bucket', 'ASC');
        const rows = await qb.getRawMany();
        return rows.map((r) => ({ bucket: r.bucket, count: Number(r.count) }));
    }
};
exports.VenueViewRepository = VenueViewRepository;
exports.VenueViewRepository = VenueViewRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], VenueViewRepository);
//# sourceMappingURL=venue-view.repository.js.map