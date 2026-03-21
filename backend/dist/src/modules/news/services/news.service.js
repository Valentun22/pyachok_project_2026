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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const news_type_enum_1 = require("../../../database/entities/enums/news-type.enum");
const role_enum_1 = require("../../../database/entities/enums/role.enum");
const news_repository_1 = require("../../repository/services/news.repository");
const venue_repository_1 = require("../../repository/services/venue.repository");
const news_mapper_1 = require("./news.mapper");
let NewsService = class NewsService {
    constructor(newsRepository, venueRepository) {
        this.newsRepository = newsRepository;
        this.venueRepository = venueRepository;
    }
    async create(userData, venueId, dto) {
        const venue = await this.venueRepository.findOneBy({ id: venueId });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        const roles = userData.roles ?? [];
        const isSuperAdmin = roles.includes(role_enum_1.RoleUserEnum.SUPERADMIN);
        if (!isSuperAdmin && venue.user_id !== userData.userId) {
            throw new common_1.ForbiddenException('You can create news only for your venue');
        }
        const isVenueAdmin = roles.includes(role_enum_1.RoleUserEnum.VENUE_ADMIN);
        if (!isSuperAdmin && !isVenueAdmin) {
            throw new common_1.ForbiddenException('Only venue admin can create news');
        }
        const entity = this.newsRepository.create({
            title: dto.title,
            body: dto.body,
            type: dto.type ?? news_type_enum_1.NewsTypeEnum.GENERAL,
            avatarNews: dto.avatarNews,
            images: dto.images,
            isActive: true,
            venue_id: venueId,
        });
        return await this.newsRepository.save(entity);
    }
    canManageNews(userData, ownerUserId) {
        const isSuperAdmin = userData.roles?.includes(role_enum_1.RoleUserEnum.SUPERADMIN);
        if (isSuperAdmin)
            return true;
        const isVenueAdmin = userData.roles?.includes(role_enum_1.RoleUserEnum.VENUE_ADMIN);
        return !!isVenueAdmin && userData.userId === ownerUserId;
    }
    async update(userData, newsId, dto) {
        const news = await this.newsRepository.findByIdWithVenueOwner(newsId);
        if (!news)
            throw new common_1.NotFoundException('News not found');
        const ownerUserId = news.venue?.user_id;
        if (!ownerUserId || !this.canManageNews(userData, ownerUserId)) {
            throw new common_1.ForbiddenException('You cannot update this news');
        }
        Object.assign(news, dto);
        return await this.newsRepository.save(news);
    }
    async updateActive(userData, newsId, isActive) {
        const news = await this.newsRepository.findByIdWithVenueOwner(newsId);
        if (!news)
            throw new common_1.NotFoundException('News not found');
        const ownerUserId = news.venue?.user_id;
        if (!ownerUserId || !this.canManageNews(userData, ownerUserId)) {
            throw new common_1.ForbiddenException('You cannot change active status for this news');
        }
        news.isActive = isActive;
        return await this.newsRepository.save(news);
    }
    async updatePaid(userData, newsId, isPaid) {
        const news = await this.newsRepository.findByIdWithVenueOwner(newsId);
        if (!news)
            throw new common_1.NotFoundException('News not found');
        const ownerUserId = news.venue?.user_id;
        if (!ownerUserId || !this.canManageNews(userData, ownerUserId)) {
            throw new common_1.ForbiddenException('You cannot change paid status for this news');
        }
        news.isPaid = isPaid;
        return await this.newsRepository.save(news);
    }
    async delete(userData, newsId) {
        const news = await this.newsRepository.findByIdWithVenueOwner(newsId);
        if (!news)
            throw new common_1.NotFoundException('News not found');
        const ownerUserId = news.venue?.user_id;
        if (!ownerUserId || !this.canManageNews(userData, ownerUserId)) {
            throw new common_1.ForbiddenException('You cannot delete this news');
        }
        await this.newsRepository.remove(news);
    }
    async getVenueManageList(userData, venueId, query) {
        const venue = await this.venueRepository.findOneBy({ id: venueId });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        const ownerUserId = venue.user_id;
        if (!this.canManageNews(userData, ownerUserId)) {
            throw new common_1.ForbiddenException('You cannot manage news for this venue');
        }
        const [entities, total] = await this.newsRepository.getVenueManageList(venueId, query);
        return news_mapper_1.NewsMapper.toListDTO(entities, total, query);
    }
    async getGlobalList(query) {
        const [entities, total] = await this.newsRepository.getGlobalList(query);
        return news_mapper_1.NewsMapper.toListDTO(entities, total, query);
    }
    async getVenueList(venueId, query) {
        const [entities, total] = await this.newsRepository.getVenueList(venueId, query);
        return news_mapper_1.NewsMapper.toListDTO(entities, total, query);
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [news_repository_1.NewsRepository,
        venue_repository_1.VenueRepository])
], NewsService);
//# sourceMappingURL=news.service.js.map