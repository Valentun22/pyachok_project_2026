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
exports.TopRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const rating_venue_entity_1 = require("../../../database/entities/rating-venue.entity");
const top_category_entity_1 = require("../../../database/entities/top-category.entity");
const top_category_venue_entity_1 = require("../../../database/entities/top-category-venue.entity");
let TopRepository = class TopRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.categories = dataSource.getRepository(top_category_entity_1.TopCategoryEntity);
        this.items = dataSource.getRepository(top_category_venue_entity_1.TopCategoryVenueEntity);
    }
    async getActiveCategories() {
        return await this.categories.find({
            where: { isActive: true },
            order: { order: 'ASC', created: 'DESC' },
        });
    }
    async getCategoryBySlug(slug) {
        return await this.categories.findOne({ where: { slug } });
    }
    async getCategoryById(id) {
        return await this.categories.findOne({ where: { id } });
    }
    async getCategoryVenuesPublic(categoryId) {
        const qb = this.dataSource
            .getRepository(top_category_venue_entity_1.TopCategoryVenueEntity)
            .createQueryBuilder('it')
            .innerJoinAndSelect('it.venue', 'venue')
            .leftJoinAndSelect('venue.tags', 'tag')
            .leftJoinAndSelect('venue.user', 'user')
            .where('it.category_id = :categoryId', { categoryId })
            .andWhere('venue.isModerated = true')
            .andWhere('venue.isActive = true')
            .orderBy('it.order', 'ASC')
            .addOrderBy('venue.created', 'DESC');
        const ratingAvgSub = qb
            .subQuery()
            .select('COALESCE(AVG(rv.rating), 0)')
            .from(rating_venue_entity_1.RatingVenueEntity, 'rv')
            .where('rv.venue_id = venue.id')
            .getQuery();
        const ratingCountSub = qb
            .subQuery()
            .select('COUNT(rv2.id)')
            .from(rating_venue_entity_1.RatingVenueEntity, 'rv2')
            .where('rv2.venue_id = venue.id')
            .getQuery();
        qb.addSelect(`(${ratingAvgSub})`, 'ratingAvg');
        qb.addSelect(`(${ratingCountSub})`, 'ratingCount');
        const rows = await qb.getRawAndEntities();
        return rows.entities.map((item, idx) => {
            const raw = rows.raw[idx];
            const venue = item.venue;
            venue.ratingAvg = Number(raw?.ratingAvg ?? 0);
            venue.ratingCount = Number(raw?.ratingCount ?? 0);
            return venue;
        });
    }
};
exports.TopRepository = TopRepository;
exports.TopRepository = TopRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TopRepository);
//# sourceMappingURL=top.repository.js.map