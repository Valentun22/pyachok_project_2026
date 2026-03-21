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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_enum_1 = require("../../../database/entities/enums/role.enum");
const rating_venue_entity_1 = require("../../../database/entities/rating-venue.entity");
const tag_entity_1 = require("../../../database/entities/tag.entity");
const user_entity_1 = require("../../../database/entities/user.entity");
const venue_entity_1 = require("../../../database/entities/venue.entity");
const email_service_1 = require("../../email/services/email.service");
const complaint_repository_1 = require("../../repository/services/complaint.repository");
const like_repository_1 = require("../../repository/services/like.repository");
const venue_repository_1 = require("../../repository/services/venue.repository");
const venue_view_repository_1 = require("../../repository/services/venue-view.repository");
const complaint_mapper_1 = require("./complaint.mapper");
let VenueService = class VenueService {
    constructor(venueRepository, venueViewRepository, likeRepository, complaintRepository, emailService, entityManager) {
        this.venueRepository = venueRepository;
        this.venueViewRepository = venueViewRepository;
        this.likeRepository = likeRepository;
        this.complaintRepository = complaintRepository;
        this.emailService = emailService;
        this.entityManager = entityManager;
    }
    assertVenueAdminOrSuperAdmin(userData) {
        const roles = userData.roles ?? [];
        const isSuperAdmin = roles.includes(role_enum_1.RoleUserEnum.SUPERADMIN);
        const isVenueAdmin = roles.includes(role_enum_1.RoleUserEnum.VENUE_ADMIN);
        if (!isSuperAdmin && !isVenueAdmin) {
            throw new common_1.ForbiddenException('Only venue admin can manage venues. Use POST /users/me/venue-admin to become one.');
        }
    }
    async assertCanAccessVenueAnalytics(userData, venueId) {
        this.assertVenueAdminOrSuperAdmin(userData);
        const isSuperAdmin = (userData.roles ?? []).includes(role_enum_1.RoleUserEnum.SUPERADMIN);
        if (isSuperAdmin)
            return;
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            select: ['id', 'user_id'],
        });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        if (venue.user_id !== userData.userId) {
            throw new common_1.ForbiddenException('You can access analytics only for your venues');
        }
    }
    async getList(userData, query) {
        return await this.venueRepository.getList(userData?.userId, query, userData?.roles ?? []);
    }
    async create(userData, dto) {
        this.assertVenueAdminOrSuperAdmin(userData);
        return await this.entityManager.transaction('SERIALIZABLE', async (em) => {
            const venueRepo = em.getRepository(venue_entity_1.VenueEntity);
            const tags = await this.createTags(dto.tags, em);
            const venue = venueRepo.create({
                ...dto,
                user_id: userData.userId,
                tags,
            });
            return await venueRepo.save(venue);
        });
    }
    async getById(userData, venueId) {
        const venue = await this.venueRepository.getById(userData?.userId, venueId);
        const isPrivileged = (userData?.roles ?? []).includes(role_enum_1.RoleUserEnum.SUPERADMIN);
        if (!isPrivileged) {
            if (!venue.isModerated || !venue.isActive) {
                throw new common_1.NotFoundException('Venue not found');
            }
        }
        return venue;
    }
    async update(userData, venueId, dto) {
        this.assertVenueAdminOrSuperAdmin(userData);
        return await this.entityManager.transaction('SERIALIZABLE', async (em) => {
            const venueRepo = em.getRepository(venue_entity_1.VenueEntity);
            const venue = await venueRepo.findOne({
                where: { id: venueId },
                relations: ['tags'],
            });
            if (!venue)
                throw new common_1.NotFoundException('Venue not found');
            const isOwner = venue.user_id === userData.userId;
            const isPrivileged = (userData.roles ?? []).includes(role_enum_1.RoleUserEnum.SUPERADMIN);
            if (!isOwner && !isPrivileged) {
                throw new common_1.ForbiddenException('You are not allowed to edit this venue');
            }
            let tags = venue.tags ?? [];
            if (dto.tags) {
                tags = await this.createTags(dto.tags, em);
            }
            Object.assign(venue, dto);
            venue.tags = tags;
            if (!isPrivileged) {
                venue.isModerated = false;
                venue.isActive = false;
            }
            await venueRepo.save(venue);
            return await this.venueRepository.getById(userData.userId, venueId, em);
        });
    }
    async delete(userData, venueId) {
        this.assertVenueAdminOrSuperAdmin(userData);
        await this.entityManager.transaction('SERIALIZABLE', async (em) => {
            const venueRepo = em.getRepository(venue_entity_1.VenueEntity);
            const venue = await venueRepo.findOne({
                where: { id: venueId },
                select: ['id', 'user_id', 'isActive'],
            });
            if (!venue)
                throw new common_1.NotFoundException('Venue not found');
            const isOwner = venue.user_id === userData.userId;
            const isPrivileged = (userData.roles ?? []).includes(role_enum_1.RoleUserEnum.SUPERADMIN);
            if (!isOwner && !isPrivileged) {
                throw new common_1.ForbiddenException('You are not allowed to delete this venue');
            }
            if (venue.isActive) {
                await venueRepo.update(venueId, { isActive: false });
            }
        });
    }
    async contactManager(userData, venueId, message) {
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            relations: ['user'],
        });
        if (!venue || !venue.isActive || !venue.isModerated) {
            throw new common_1.NotFoundException('Venue not found');
        }
        const to = venue.email || venue.user?.email;
        if (!to)
            return;
        const subject = `📩 Нове повідомлення для закладу «${venue.name}»`;
        const text = [
            `Заклад: ${venue.name}`,
            `Відправник: ${userData.email}`,
            `─────────────────────────`,
            message,
            `─────────────────────────`,
            `Це повідомлення надіслано через платформу Пиячок`,
        ].join('\n');
        await this.emailService.sendMail(to, subject, text);
    }
    async like(userData, venueId) {
        await this.checkIsVenueExistOrThrow(venueId);
        const like = await this.likeRepository.findOneBy({
            venue_id: venueId,
            user_id: userData.userId,
        });
        if (like) {
            throw new common_1.ConflictException('Venue liked');
        }
        await this.likeRepository.save(this.likeRepository.create({
            venue_id: venueId,
            user_id: userData.userId,
        }));
        return await this.venueRepository.getById(userData.userId, venueId);
    }
    async unlike(userData, venueId) {
        await this.checkIsVenueExistOrThrow(venueId);
        const like = await this.likeRepository.findOneBy({
            venue_id: venueId,
            user_id: userData.userId,
        });
        if (!like) {
            throw new common_1.ConflictException('Not liked yet');
        }
        await this.likeRepository.remove(like);
        return await this.venueRepository.getById(userData.userId, venueId);
    }
    async checkIsVenueExistOrThrow(venueId) {
        const venue = await this.venueRepository.findOneBy({ id: venueId });
        if (!venue) {
            throw new common_1.NotFoundException('Venue not found');
        }
    }
    async createTags(tags, em) {
        const tagRepository = em.getRepository(tag_entity_1.TagEntity);
        if (!tags || tags.length === 0)
            return [];
        const entities = await tagRepository.findBy({ name: (0, typeorm_2.In)(tags) });
        const existingTags = entities.map((entity) => entity.name);
        const newTags = tags.filter((tag) => !existingTags.includes(tag));
        const newEntities = await tagRepository.save(newTags.map((tag) => tagRepository.create({ name: tag })));
        return [...entities, ...newEntities];
    }
    async addToFavorites(userId, venueId) {
        await this.entityManager.transaction(async (em) => {
            const userRepo = em.getRepository(user_entity_1.UserEntity);
            const venueRepo = em.getRepository(venue_entity_1.VenueEntity);
            const venue = await venueRepo.findOne({
                where: { id: venueId },
                select: ['id'],
            });
            if (!venue)
                throw new common_1.NotFoundException('Venue not found');
            const user = await userRepo.findOne({
                where: { id: userId },
                relations: ['favoriteVenues'],
            });
            const already = (user.favoriteVenues ?? []).some((v) => v.id === venueId);
            if (!already) {
                user.favoriteVenues = [...(user.favoriteVenues ?? []), venue];
                await userRepo.save(user);
            }
        });
    }
    async removeFromFavorites(userId, venueId) {
        await this.entityManager.transaction(async (em) => {
            const userRepo = em.getRepository(user_entity_1.UserEntity);
            const user = await userRepo.findOne({
                where: { id: userId },
                relations: ['favoriteVenues'],
            });
            user.favoriteVenues = (user.favoriteVenues ?? []).filter((v) => v.id !== venueId);
            await userRepo.save(user);
        });
    }
    async setRating(userId, venueId, rating) {
        await this.checkIsVenueExistOrThrow(venueId);
        await this.entityManager.transaction(async (em) => {
            const ratingRepo = em.getRepository(rating_venue_entity_1.RatingVenueEntity);
            const existing = await ratingRepo.findOne({
                where: { user_id: userId, venue_id: venueId },
                select: ['id', 'rating', 'user_id', 'venue_id'],
            });
            if (existing) {
                existing.rating = rating;
                await ratingRepo.save(existing);
                return;
            }
            await ratingRepo.save(ratingRepo.create({
                user_id: userId,
                venue_id: venueId,
                rating,
            }));
        });
    }
    async removeRating(userId, venueId) {
        await this.checkIsVenueExistOrThrow(venueId);
        await this.entityManager.transaction(async (em) => {
            const ratingRepo = em.getRepository(rating_venue_entity_1.RatingVenueEntity);
            await ratingRepo.delete({ user_id: userId, venue_id: venueId });
        });
    }
    async logViewSafe(params) {
        try {
            await this.venueViewRepository.logView(params);
        }
        catch { }
    }
    async getVenueViewsSummary(userData, venueId, query) {
        await this.assertCanAccessVenueAnalytics(userData, venueId);
        return await this.venueViewRepository.getViewsSummary(venueId, query.fromDate, query.toDate);
    }
    async getVenueViewsTimeSeries(userData, venueId, query) {
        await this.assertCanAccessVenueAnalytics(userData, venueId);
        const bucket = query.bucket ?? 'day';
        return await this.venueViewRepository.getViewsTimeSeries(venueId, bucket, query.fromDate, query.toDate);
    }
    async createComplaint(userData, venueId, dto) {
        await this.checkIsVenueExistOrThrow(venueId);
        const entity = this.complaintRepository.create({
            venue_id: venueId,
            user_id: userData.userId,
            type: dto.type,
            targetId: dto.targetId,
            reason: dto.reason,
        });
        const saved = await this.complaintRepository.save(entity);
        const full = await this.complaintRepository.findOne({
            where: { id: saved.id },
            relations: { user: true, venue: true },
        });
        return complaint_mapper_1.ComplaintMapper.toResponseDTO(full ?? saved);
    }
    async getComplaintsForVenue(userData, venueId, query) {
        this.assertVenueAdminOrSuperAdmin(userData);
        const isSuperAdmin = (userData.roles ?? []).includes(role_enum_1.RoleUserEnum.SUPERADMIN);
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            select: ['id', 'user_id'],
        });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        if (!isSuperAdmin && venue.user_id !== userData.userId) {
            throw new common_1.ForbiddenException('You can access complaints only for your venues');
        }
        const [entities, total] = await this.complaintRepository.getListForVenue(venueId, query);
        return complaint_mapper_1.ComplaintMapper.toListResponseDTO(entities, total, query.limit, query.offset);
    }
};
exports.VenueService = VenueService;
exports.VenueService = VenueService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [venue_repository_1.VenueRepository,
        venue_view_repository_1.VenueViewRepository,
        like_repository_1.LikeRepository,
        complaint_repository_1.ComplaintRepository,
        email_service_1.EmailService,
        typeorm_2.EntityManager])
], VenueService);
//# sourceMappingURL=venue.service.js.map