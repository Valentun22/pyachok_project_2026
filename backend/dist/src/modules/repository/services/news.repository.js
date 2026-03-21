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
exports.NewsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const news_type_enum_1 = require("../../../database/entities/enums/news-type.enum");
const news_entity_1 = require("../../../database/entities/news.entity");
let NewsRepository = class NewsRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(news_entity_1.NewsEntity, dataSource.manager);
        this.dataSource = dataSource;
    }
    async getVenueManageList(venueId, query) {
        const qb = this.createQueryBuilder('news');
        qb.leftJoinAndSelect('news.venue', 'venue');
        qb.andWhere('news.venue_id = :venueId', { venueId });
        if (query.type) {
            qb.andWhere('news.type = :type', { type: query.type });
        }
        qb.orderBy('news.created', 'DESC');
        qb.take(query.limit);
        qb.skip(query.offset);
        return await qb.getManyAndCount();
    }
    async findByIdWithVenueOwner(newsId) {
        return await this.createQueryBuilder('news')
            .leftJoinAndSelect('news.venue', 'venue')
            .where('news.id = :newsId', { newsId })
            .getOne();
    }
    async getGlobalList(query) {
        const qb = this.createQueryBuilder('news');
        qb.leftJoinAndSelect('news.venue', 'venue');
        qb.andWhere('news.isActive = :isActive', { isActive: true });
        qb.andWhere('(news.type = :general OR (news.type IN (:...paidTypes) AND news.isPaid = true))', {
            general: news_type_enum_1.NewsTypeEnum.GENERAL,
            paidTypes: [news_type_enum_1.NewsTypeEnum.PROMOTION, news_type_enum_1.NewsTypeEnum.EVENT],
        });
        if (query.type) {
            qb.andWhere('news.type = :type', { type: query.type });
        }
        qb.orderBy('news.created', 'DESC');
        qb.take(query.limit);
        qb.skip(query.offset);
        return await qb.getManyAndCount();
    }
    async getVenueList(venueId, query) {
        const qb = this.createQueryBuilder('news');
        qb.leftJoinAndSelect('news.venue', 'venue');
        qb.andWhere('news.isActive = :isActive', { isActive: true });
        qb.andWhere('news.venue_id = :venueId', { venueId });
        if (query.type) {
            qb.andWhere('news.type = :type', { type: query.type });
        }
        qb.orderBy('news.created', 'DESC');
        qb.take(query.limit);
        qb.skip(query.offset);
        return await qb.getManyAndCount();
    }
};
exports.NewsRepository = NewsRepository;
exports.NewsRepository = NewsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], NewsRepository);
//# sourceMappingURL=news.repository.js.map