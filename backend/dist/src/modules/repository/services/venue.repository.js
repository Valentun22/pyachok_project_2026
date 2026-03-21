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
exports.VenueRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const role_enum_1 = require("../../../database/entities/enums/role.enum");
const like_entity_1 = require("../../../database/entities/like.entity");
const rating_venue_entity_1 = require("../../../database/entities/rating-venue.entity");
const venue_entity_1 = require("../../../database/entities/venue.entity");
const venue_list_query_dto_1 = require("../../venue/dto/req/venue-list.query.dto");
let VenueRepository = class VenueRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(venue_entity_1.VenueEntity, dataSource.manager);
        this.dataSource = dataSource;
    }
    async getList(userId, query, roles = []) {
        const qb = this.createQueryBuilder('venue');
        const isPrivileged = roles.includes(role_enum_1.RoleUserEnum.SUPERADMIN);
        if (!isPrivileged) {
            qb.andWhere('venue.isModerated = true');
            qb.andWhere('venue.isActive = true');
        }
        qb.leftJoinAndSelect('venue.tags', 'tag');
        qb.leftJoinAndSelect('venue.user', 'user');
        if (userId) {
            qb.leftJoinAndSelect('venue.likes', 'like', 'like.user_id = :userId');
            qb.leftJoinAndSelect('user.followings', 'following', 'following.follower_id = :userId');
            qb.setParameter('userId', userId);
        }
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
        const likesCountSub = qb
            .subQuery()
            .select('COUNT(l.id)')
            .from('likes', 'l')
            .where('l.venue_id = venue.id')
            .getQuery();
        qb.addSelect(`(${likesCountSub})`, 'likesCount');
        if (query.search) {
            qb.andWhere('CONCAT(venue.name, venue.description) ILIKE :search');
            qb.setParameter('search', `%${query.search}%`);
        }
        if (query.city) {
            qb.andWhere('LOWER(venue.city) ILIKE :city');
            qb.setParameter('city', `%${query.city.toLowerCase()}%`);
        }
        if (query.ownerId) {
            qb.andWhere('venue.user_id = :ownerId', { ownerId: query.ownerId });
        }
        if (query.tag) {
            qb.andWhere('tag.name = :tag');
            qb.setParameter('tag', query.tag);
        }
        if (query.categories?.length) {
            qb.andWhere('venue.categories && :categories');
            qb.setParameter('categories', query.categories);
        }
        if (typeof query.averageCheckFrom === 'number') {
            qb.andWhere('venue.averageCheck >= :avgFrom');
            qb.setParameter('avgFrom', query.averageCheckFrom);
        }
        if (typeof query.averageCheckTo === 'number') {
            qb.andWhere('venue.averageCheck <= :avgTo');
            qb.setParameter('avgTo', query.averageCheckTo);
        }
        if (typeof query.ratingFrom === 'number') {
            qb.andWhere(`(${ratingAvgSub}) >= :ratingFrom`);
            qb.setParameter('ratingFrom', query.ratingFrom);
        }
        if (typeof query.ratingTo === 'number') {
            qb.andWhere(`(${ratingAvgSub}) <= :ratingTo`);
            qb.setParameter('ratingTo', query.ratingTo);
        }
        const boolFilters = [
            ['hasWiFi', 'venue.hasWiFi'],
            ['hasParking', 'venue.hasParking'],
            ['liveMusic', 'venue.liveMusic'],
            ['petFriendly', 'venue.petFriendly'],
            ['hasTerrace', 'venue.hasTerrace'],
            ['smokingAllowed', 'venue.smokingAllowed'],
            ['cardPayment', 'venue.cardPayment'],
        ];
        for (const [key, column] of boolFilters) {
            const v = query[key];
            if (v === true)
                qb.andWhere(`${column} = true`);
        }
        const order = (query.sortOrder ?? venue_list_query_dto_1.SortOrderEnum.DESC);
        switch (query.sortBy) {
            case venue_list_query_dto_1.VenueSortByEnum.RATING:
                qb.orderBy('ratingAvg', order);
                break;
            case venue_list_query_dto_1.VenueSortByEnum.AVERAGE_CHECK:
                qb.orderBy('venue.averageCheck', order);
                break;
            case venue_list_query_dto_1.VenueSortByEnum.NAME:
                qb.orderBy('venue.name', order);
                break;
            case venue_list_query_dto_1.VenueSortByEnum.CREATED:
            default:
                qb.orderBy('venue.created', order);
                break;
        }
        const qbCount = this.createQueryBuilder('venue');
        if (!isPrivileged) {
            qbCount.andWhere('venue.isModerated = true');
            qbCount.andWhere('venue.isActive = true');
        }
        if (query.search) {
            qbCount.andWhere('CONCAT(venue.name, venue.description) ILIKE :search');
            qbCount.setParameter('search', `%${query.search}%`);
        }
        if (query.city) {
            qbCount.andWhere('LOWER(venue.city) ILIKE :city');
            qbCount.setParameter('city', `%${query.city.toLowerCase()}%`);
        }
        if (query.ownerId) {
            qbCount.andWhere('venue.user_id = :ownerId', { ownerId: query.ownerId });
        }
        if (query.tag) {
            qbCount.leftJoin('venue.tags', 'tag');
            qbCount.andWhere('tag.name = :tag');
            qbCount.setParameter('tag', query.tag);
        }
        if (query.categories?.length) {
            qbCount.andWhere('venue.categories && :categories');
            qbCount.setParameter('categories', query.categories);
        }
        if (typeof query.averageCheckFrom === 'number') {
            qbCount.andWhere('venue.averageCheck >= :avgFrom');
            qbCount.setParameter('avgFrom', query.averageCheckFrom);
        }
        if (typeof query.averageCheckTo === 'number') {
            qbCount.andWhere('venue.averageCheck <= :avgTo');
            qbCount.setParameter('avgTo', query.averageCheckTo);
        }
        if (typeof query.ratingFrom === 'number') {
            const ratingAvgSubCount = qbCount
                .subQuery()
                .select('COALESCE(AVG(rv.rating), 0)')
                .from(rating_venue_entity_1.RatingVenueEntity, 'rv')
                .where('rv.venue_id = venue.id')
                .getQuery();
            qbCount.andWhere(`(${ratingAvgSubCount}) >= :ratingFrom`);
            qbCount.setParameter('ratingFrom', query.ratingFrom);
        }
        if (typeof query.ratingTo === 'number') {
            const ratingAvgSubCount = qbCount
                .subQuery()
                .select('COALESCE(AVG(rv.rating), 0)')
                .from(rating_venue_entity_1.RatingVenueEntity, 'rv')
                .where('rv.venue_id = venue.id')
                .getQuery();
            qbCount.andWhere(`(${ratingAvgSubCount}) <= :ratingTo`);
            qbCount.setParameter('ratingTo', query.ratingTo);
        }
        for (const [key, column] of [
            ['hasWiFi', 'venue.hasWiFi'],
            ['hasParking', 'venue.hasParking'],
            ['liveMusic', 'venue.liveMusic'],
            ['petFriendly', 'venue.petFriendly'],
            ['hasTerrace', 'venue.hasTerrace'],
            ['smokingAllowed', 'venue.smokingAllowed'],
            ['cardPayment', 'venue.cardPayment'],
        ]) {
            const v = query[key];
            if (v === true)
                qbCount.andWhere(`${column} = true`);
        }
        qbCount.select('venue.id').distinct(true);
        const total = await qbCount.getCount();
        qb.take(query.limit);
        qb.skip(query.offset);
        const { entities, raw } = await qb.getRawAndEntities();
        entities.forEach((e, idx) => {
            e.ratingAvg = raw[idx]?.ratingAvg
                ? Number(raw[idx].ratingAvg)
                : 0;
            e.ratingCount = raw[idx]?.ratingCount
                ? Number(raw[idx].ratingCount)
                : 0;
            e.likesCount = raw[idx]?.likesCount
                ? Number(raw[idx].likesCount)
                : 0;
        });
        return [entities, total];
    }
    async getById(userId, venueId, em) {
        const repo = em ? em.getRepository(venue_entity_1.VenueEntity) : this;
        const qb = repo.createQueryBuilder('venue');
        qb.leftJoinAndSelect('venue.tags', 'tag');
        qb.leftJoinAndSelect('venue.user', 'user');
        if (userId) {
            qb.leftJoinAndSelect('venue.likes', 'like', 'like.user_id = :userId');
            qb.leftJoinAndSelect('user.followings', 'following', 'following.follower_id = :userId');
            qb.leftJoinAndSelect('venue.favoritedBy', 'favUser', 'favUser.id = :userId');
            qb.setParameter('userId', userId);
        }
        qb.andWhere('venue.id = :venueId', { venueId });
        const entity = await qb.getOneOrFail();
        const ratingRepo = em
            ? em.getRepository(rating_venue_entity_1.RatingVenueEntity)
            : this.dataSource.getRepository(rating_venue_entity_1.RatingVenueEntity);
        const { ratingAvg, ratingCount } = (await ratingRepo
            .createQueryBuilder('rv')
            .select('COALESCE(AVG(rv.rating), 0)', 'ratingAvg')
            .addSelect('COUNT(rv.id)', 'ratingCount')
            .where('rv.venue_id = :venueId', { venueId })
            .getRawOne());
        entity.ratingAvg = ratingAvg ? Number(ratingAvg) : 0;
        entity.ratingCount = ratingCount ? Number(ratingCount) : 0;
        entity.isFavorite = userId
            ? (entity.favoritedBy?.length ?? 0) > 0
            : false;
        const likeRepo = em
            ? em.getRepository(like_entity_1.LikeEntity)
            : this.dataSource.getRepository(like_entity_1.LikeEntity);
        const likesCount = await likeRepo
            .createQueryBuilder('l')
            .where('l.venue_id = :venueId', { venueId })
            .getCount();
        entity.likesCount = likesCount;
        return entity;
    }
};
exports.VenueRepository = VenueRepository;
exports.VenueRepository = VenueRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], VenueRepository);
//# sourceMappingURL=venue.repository.js.map