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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../repository/services/user.repository");
const typeorm_1 = require("typeorm");
const role_enum_1 = require("../../../database/entities/enums/role.enum");
const rating_venue_entity_1 = require("../../../database/entities/rating-venue.entity");
const comment_mapper_1 = require("../../comments/services/comment.mapper");
const app_setting_repository_1 = require("../../repository/services/app-setting.repository");
const comment_repository_1 = require("../../repository/services/comment.repository");
const complaint_repository_1 = require("../../repository/services/complaint.repository");
const rating_venue_repository_1 = require("../../repository/services/rating-venue.repository");
const tag_repository_1 = require("../../repository/services/tag.repository");
const top_repository_1 = require("../../repository/services/top.repository");
const venue_repository_1 = require("../../repository/services/venue.repository");
const venue_view_repository_1 = require("../../repository/services/venue-view.repository");
const user_mapper_1 = require("../../users/services/user.mapper");
const complaint_mapper_1 = require("../../venue/services/complaint.mapper");
const venue_mapper_1 = require("../../venue/services/venue.mapper");
let AdminService = class AdminService {
    constructor(venueRepository, userRepository, commentRepository, appSettingRepository, venueViewRepository, ratingVenueRepository, tagRepository, complaintRepository, topRepository) {
        this.venueRepository = venueRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.appSettingRepository = appSettingRepository;
        this.venueViewRepository = venueViewRepository;
        this.ratingVenueRepository = ratingVenueRepository;
        this.tagRepository = tagRepository;
        this.complaintRepository = complaintRepository;
        this.topRepository = topRepository;
    }
    assertSuperAdmin(userData) {
        const roles = userData.roles ?? [];
        if (!roles.includes(role_enum_1.RoleUserEnum.SUPERADMIN)) {
            throw new common_1.ForbiddenException('Only SUPERADMIN can access this endpoint');
        }
    }
    async getPendingVenues(userData, query) {
        this.assertSuperAdmin(userData);
        const qb = this.venueRepository.createQueryBuilder('venue');
        qb.leftJoinAndSelect('venue.tags', 'tag');
        qb.leftJoinAndSelect('venue.user', 'user');
        qb.leftJoinAndSelect('venue.likes', 'like', 'like.user_id = :userId');
        qb.leftJoinAndSelect('user.followings', 'following', 'following.follower_id = :userId');
        qb.setParameter('userId', userData.userId);
        qb.andWhere('venue.isModerated = false');
        if (query.search) {
            qb.andWhere('CONCAT(venue.name, venue.description) ILIKE :search');
            qb.setParameter('search', `%${query.search}%`);
        }
        if (query.tag) {
            qb.andWhere('tag.name = :tag');
            qb.setParameter('tag', query.tag);
        }
        qb.orderBy('venue.created', 'DESC');
        qb.take(query.limit);
        qb.skip(query.offset);
        const [entities, total] = await qb.getManyAndCount();
        return venue_mapper_1.VenueMapper.toResponseListDTO(entities, total, query);
    }
    async getAllVenues(userData, query) {
        this.assertSuperAdmin(userData);
        const qb = this.venueRepository.createQueryBuilder('venue');
        qb.leftJoinAndSelect('venue.tags', 'tag');
        qb.leftJoinAndSelect('venue.user', 'user');
        qb.leftJoinAndSelect('venue.likes', 'like', 'like.user_id = :userId');
        qb.leftJoinAndSelect('user.followings', 'following', 'following.follower_id = :userId');
        qb.setParameter('userId', userData.userId);
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
        if (typeof query.isModerated === 'boolean') {
            qb.andWhere('venue.isModerated = :isModerated', {
                isModerated: query.isModerated,
            });
        }
        if (typeof query.isActive === 'boolean') {
            qb.andWhere('venue.isActive = :isActive', { isActive: query.isActive });
        }
        if (query.search) {
            qb.andWhere('CONCAT(venue.name, venue.description) ILIKE :search');
            qb.setParameter('search', `%${query.search}%`);
        }
        if (query.tag) {
            qb.andWhere('tag.name = :tag');
            qb.setParameter('tag', query.tag);
        }
        qb.orderBy('venue.created', 'DESC');
        qb.take(query.limit ?? 10);
        qb.skip(query.offset ?? 0);
        const total = await qb.getCount();
        const { entities, raw } = await qb.getRawAndEntities();
        entities.forEach((e, idx) => {
            e.ratingAvg = raw[idx]?.ratingAvg
                ? Number(raw[idx].ratingAvg)
                : 0;
            e.ratingCount = raw[idx]?.ratingCount
                ? Number(raw[idx].ratingCount)
                : 0;
        });
        return venue_mapper_1.VenueMapper.toResponseListDTO(entities, total, {
            limit: query.limit ?? 10,
            offset: query.offset ?? 0,
            search: query.search,
            tag: query.tag,
        });
    }
    async approveVenue(userData, venueId) {
        this.assertSuperAdmin(userData);
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            select: ['id', 'isModerated'],
        });
        if (!venue) {
            throw new common_1.NotFoundException('Venue not found');
        }
        if (!venue.isModerated) {
            await this.venueRepository.update(venueId, { isModerated: true });
        }
    }
    async toggleVenueActive(userData, venueId) {
        this.assertSuperAdmin(userData);
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            select: ['id', 'isActive'],
        });
        if (!venue) {
            throw new common_1.NotFoundException('Venue not found');
        }
        await this.venueRepository.update(venueId, { isActive: !venue.isActive });
    }
    async updateVenue(userData, venueId, dto) {
        this.assertSuperAdmin(userData);
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            relations: ['tags', 'user', 'likes'],
        });
        if (!venue) {
            throw new common_1.NotFoundException('Venue not found');
        }
        let tagsEntities = undefined;
        if (dto.tags) {
            const names = Array.from(new Set(dto.tags.map((t) => t.trim()).filter(Boolean)));
            tagsEntities = [];
            for (const name of names) {
                const existing = await this.tagRepository.findOne({ where: { name } });
                if (existing) {
                    tagsEntities.push(existing);
                }
                else {
                    const created = await this.tagRepository.save(this.tagRepository.create({ name }));
                    tagsEntities.push(created);
                }
            }
        }
        const { tags: _tags, ...plain } = dto;
        void _tags;
        this.venueRepository.merge(venue, plain);
        if (tagsEntities) {
            venue.tags = tagsEntities;
        }
        const saved = await this.venueRepository.save(venue);
        const full = await this.venueRepository.findOne({
            where: { id: saved.id },
            relations: ['tags', 'user', 'likes'],
        });
        return venue_mapper_1.VenueMapper.toResponseDTO(full);
    }
    async deleteVenue(userData, venueId) {
        this.assertSuperAdmin(userData);
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            select: ['id'],
        });
        if (!venue) {
            throw new common_1.NotFoundException('Venue not found');
        }
        await this.venueRepository.delete({ id: venueId });
    }
    async getAllUsers(userData, query) {
        this.assertSuperAdmin(userData);
        const limit = query.limit ?? 10;
        const offset = query.offset ?? 0;
        const [users, total] = await this.userRepository.getAdminList(limit, offset, query.search);
        return {
            data: users.map((u) => user_mapper_1.UserMapper.toResponseDTO(u)),
            total,
            limit,
            offset,
        };
    }
    async updateUser(userData, userId, dto) {
        this.assertSuperAdmin(userData);
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: [
                'id',
                'name',
                'email',
                'bio',
                'image',
                'role',
                'created',
                'updated',
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (dto.role) {
            const roles = new Set(dto.role);
            roles.add(role_enum_1.RoleUserEnum.USER);
            user.role = Array.from(roles);
        }
        if (dto.name !== undefined)
            user.name = dto.name;
        if (dto.bio !== undefined)
            user.bio = dto.bio;
        if (dto.image !== undefined)
            user.image = dto.image;
        const saved = await this.userRepository.save(user);
        return user_mapper_1.UserMapper.toResponseDTO(saved);
    }
    async deleteUser(userData, userId) {
        this.assertSuperAdmin(userData);
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['id'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.userRepository.manager.query(`DELETE
       FROM likes
       WHERE user_id = $1`, [userId]);
        await this.userRepository.manager.query(`DELETE
       FROM rating_venue
       WHERE user_id = $1`, [userId]);
        await this.userRepository.manager.query(`DELETE
       FROM comments
       WHERE user_id = $1`, [userId]);
        await this.userRepository.manager.query(`DELETE
       FROM refresh_tokens
       WHERE user_id = $1`, [userId]);
        await this.userRepository.manager.query(`DELETE
       FROM complaints
       WHERE user_id = $1`, [userId]);
        await this.userRepository.manager.query(`DELETE
       FROM follows
       WHERE follower_id = $1
          OR following_id = $2`, [userId, userId]);
        await this.userRepository.manager.query(`DELETE
       FROM user_favorite_venues
       WHERE user_id = $1`, [userId]);
        await this.userRepository.manager.query(`DELETE
       FROM messages
       WHERE sender_id = $1
          OR recipient_id = $2`, [userId, userId]);
        await this.userRepository.manager.query(`DELETE
       FROM pyachok_request
       WHERE user_id = $1`, [userId]);
        const venues = await this.userRepository.manager.query(`SELECT id
       FROM venues
       WHERE user_id = $1`, [userId]);
        for (const venue of venues) {
            const vid = venue.id;
            await this.userRepository.manager.query(`DELETE
         FROM likes
         WHERE venue_id = $1`, [vid]);
            await this.userRepository.manager.query(`DELETE
         FROM rating_venue
         WHERE venue_id = $1`, [vid]);
            await this.userRepository.manager.query(`DELETE
         FROM comments
         WHERE venue_id = $1`, [vid]);
            await this.userRepository.manager.query(`DELETE
         FROM complaints
         WHERE venue_id = $1`, [vid]);
            await this.userRepository.manager.query(`DELETE
         FROM user_favorite_venues
         WHERE venue_id = $1`, [vid]);
            await this.userRepository.manager.query(`DELETE
         FROM pyachok_request
         WHERE venue_id = $1`, [vid]);
            await this.userRepository.manager.query(`DELETE
         FROM news
         WHERE venue_id = $1`, [vid]);
            await this.userRepository.manager.query(`DELETE
         FROM venue_views
         WHERE venue_id = $1`, [vid]);
            await this.userRepository.manager.query(`DELETE
         FROM top_category_venues
         WHERE venue_id = $1`, [vid]);
        }
        await this.userRepository.manager.query(`DELETE
       FROM venues
       WHERE user_id = $1`, [userId]);
        await this.userRepository.delete({ id: userId });
    }
    async reassignVenueOwner(userData, venueId, newOwnerUserId) {
        this.assertSuperAdmin(userData);
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            select: ['id', 'user_id'],
        });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        const newOwner = await this.userRepository.findOne({
            where: { id: newOwnerUserId },
            select: ['id'],
        });
        if (!newOwner)
            throw new common_1.NotFoundException('New owner user not found');
        await this.venueRepository.update(venueId, { user_id: newOwnerUserId });
    }
    async getAllComments(userData, limit = 20, offset = 0, search) {
        this.assertSuperAdmin(userData);
        const [items, total] = await this.commentRepository.getAllComments(limit, offset, search);
        return {
            data: items.map((c) => ({
                id: c.id,
                title: c.title,
                body: c.body,
                rating: c.rating,
                image_check: c.image_check,
                created: c.created,
                user: c.user
                    ? { id: c.user.id, name: c.user.name, image: c.user.image }
                    : null,
                venue: c.venue ? { id: c.venue.id, name: c.venue.name } : null,
            })),
            total,
            limit,
            offset,
        };
    }
    async updateComment(userData, commentId, dto) {
        this.assertSuperAdmin(userData);
        const comment = await this.commentRepository.findOne({
            where: { id: commentId },
            relations: ['user'],
        });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        if (dto.title !== undefined)
            comment.title = dto.title;
        if (dto.body !== undefined)
            comment.body = dto.body;
        if (dto.rating !== undefined)
            comment.rating = dto.rating;
        if (dto.image_check !== undefined)
            comment.image_check = dto.image_check;
        if (dto.recommendation !== undefined) {
            comment.recommendation = dto.recommendation;
        }
        const saved = await this.commentRepository.save(comment);
        const full = await this.commentRepository.findOne({
            where: { id: saved.id },
            relations: ['user'],
        });
        return comment_mapper_1.CommentMapper.toResponseDTO(userData, full);
    }
    async deleteComment(userData, commentId) {
        this.assertSuperAdmin(userData);
        const exists = await this.commentRepository.findOne({
            where: { id: commentId },
            select: ['id'],
        });
        if (!exists)
            throw new common_1.NotFoundException('Comment not found');
        await this.commentRepository.delete({ id: commentId });
    }
    async setVenueRatingForUser(userData, venueId, userId, rating) {
        this.assertSuperAdmin(userData);
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            select: ['id'],
        });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['id'],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const existing = await this.ratingVenueRepository.findOne({
            where: { user_id: userId, venue_id: venueId },
            select: ['id', 'user_id', 'venue_id', 'rating'],
        });
        if (existing) {
            existing.rating = rating;
            await this.ratingVenueRepository.save(existing);
            return;
        }
        await this.ratingVenueRepository.save(this.ratingVenueRepository.create({
            user_id: userId,
            venue_id: venueId,
            rating,
        }));
    }
    async removeVenueRatingForUser(userData, venueId, userId) {
        this.assertSuperAdmin(userData);
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            select: ['id'],
        });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['id'],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.ratingVenueRepository.delete({
            user_id: userId,
            venue_id: venueId,
        });
    }
    async getVenueViewsSummary(userData, venueId, query) {
        this.assertSuperAdmin(userData);
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            select: ['id'],
        });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        return await this.venueViewRepository.getViewsSummary(venueId, query.fromDate, query.toDate);
    }
    async getVenueViewsTimeSeries(userData, venueId, query) {
        this.assertSuperAdmin(userData);
        const venue = await this.venueRepository.findOne({
            where: { id: venueId },
            select: ['id'],
        });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        const bucket = query.bucket ?? 'day';
        const rows = await this.venueViewRepository.getViewsTimeSeries(venueId, bucket, query.fromDate, query.toDate);
        return rows;
    }
    async getCmsSettings(userData) {
        this.assertSuperAdmin(userData);
        return await this.appSettingRepository.getAll();
    }
    async updateCmsSettings(userData, data) {
        this.assertSuperAdmin(userData);
        await this.appSettingRepository.upsertManySettings(data);
        return await this.appSettingRepository.getAll();
    }
    async getPublicCmsSettings() {
        const all = await this.appSettingRepository.getAll();
        const PUBLIC_KEYS = [
            'about_text',
            'about_title',
            'about_idea',
            'contact_phone',
            'contact_email',
            'contact_address',
            'social_instagram',
            'social_facebook',
            'social_telegram',
            'warning_age',
            'warning_safety',
            'seo_title',
            'seo_description',
        ];
        return Object.fromEntries(Object.entries(all).filter(([k]) => PUBLIC_KEYS.includes(k)));
    }
    async getComplaints(userData, query) {
        this.assertSuperAdmin(userData);
        const [entities, total] = await this.complaintRepository.getAdminList(query);
        return complaint_mapper_1.ComplaintMapper.toListResponseDTO(entities, total, query.limit, query.offset);
    }
    async getComplaintById(userData, complaintId) {
        this.assertSuperAdmin(userData);
        const entity = await this.complaintRepository.findOne({
            where: { id: complaintId },
            relations: { user: true, venue: true },
        });
        if (!entity)
            throw new common_1.NotFoundException('Complaint not found');
        return complaint_mapper_1.ComplaintMapper.toResponseDTO(entity);
    }
    async updateComplaintStatus(userData, complaintId, dto) {
        this.assertSuperAdmin(userData);
        const entity = await this.complaintRepository.findOne({
            where: { id: complaintId },
            relations: { user: true, venue: true },
        });
        if (!entity)
            throw new common_1.NotFoundException('Complaint not found');
        entity.status = dto.status;
        const saved = await this.complaintRepository.save(entity);
        return complaint_mapper_1.ComplaintMapper.toResponseDTO(saved);
    }
    async getTopCategories(userData) {
        this.assertSuperAdmin(userData);
        const categories = await this.topRepository.categories.find({
            order: { order: 'ASC', created: 'DESC' },
        });
        return categories.map((c) => this.mapTopCategory(c));
    }
    async createTopCategory(userData, dto) {
        this.assertSuperAdmin(userData);
        const slug = (dto.slug?.trim() || this.slugify(dto.title)).toLowerCase();
        const entity = this.topRepository.categories.create({
            title: dto.title.trim(),
            slug,
            isActive: dto.isActive ?? true,
            order: dto.order ?? 0,
        });
        const saved = await this.topRepository.categories.save(entity);
        return this.mapTopCategory(saved);
    }
    async updateTopCategory(userData, categoryId, dto) {
        this.assertSuperAdmin(userData);
        const entity = await this.topRepository.getCategoryById(categoryId);
        if (!entity)
            throw new common_1.NotFoundException('Top category not found');
        if (dto.title !== undefined)
            entity.title = dto.title.trim();
        if (dto.slug !== undefined)
            entity.slug = dto.slug.trim().toLowerCase();
        if (dto.isActive !== undefined)
            entity.isActive = dto.isActive;
        if (dto.order !== undefined)
            entity.order = dto.order;
        const saved = await this.topRepository.categories.save(entity);
        return this.mapTopCategory(saved);
    }
    async deleteTopCategory(userData, categoryId) {
        this.assertSuperAdmin(userData);
        const res = await this.topRepository.categories.delete({ id: categoryId });
        if (!res.affected)
            throw new common_1.NotFoundException('Top category not found');
    }
    async reorderTopCategories(userData, dto) {
        this.assertSuperAdmin(userData);
        const ids = dto.items.map((i) => i.categoryId);
        const categories = await this.topRepository.categories.findBy({
            id: (0, typeorm_1.In)(ids),
        });
        const map = new Map(dto.items.map((i) => [i.categoryId, i.order]));
        for (const c of categories) {
            const order = map.get(c.id);
            if (order !== undefined)
                c.order = order;
        }
        await this.topRepository.categories.save(categories);
    }
    async addVenueToTopCategory(userData, categoryId, dto) {
        this.assertSuperAdmin(userData);
        const category = await this.topRepository.getCategoryById(categoryId);
        if (!category)
            throw new common_1.NotFoundException('Top category not found');
        const venue = await this.venueRepository.findOne({
            where: { id: dto.venueId },
        });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        const item = this.topRepository.items.create({
            category_id: category.id,
            venue_id: venue.id,
            order: dto.order ?? 0,
        });
        await this.topRepository.items.save(item);
    }
    async removeVenueFromTopCategory(userData, categoryId, venueId) {
        this.assertSuperAdmin(userData);
        await this.topRepository.items.delete({
            category_id: categoryId,
            venue_id: venueId,
        });
    }
    async reorderTopCategoryVenues(userData, categoryId, dto) {
        this.assertSuperAdmin(userData);
        const items = await this.topRepository.items.find({
            where: { category_id: categoryId },
        });
        const map = new Map(dto.items.map((i) => [i.venueId, i.order]));
        for (const it of items) {
            const order = map.get(it.venue_id);
            if (order !== undefined)
                it.order = order;
        }
        await this.topRepository.items.save(items);
    }
    async getTopCategoryWithVenues(userData, categoryId) {
        this.assertSuperAdmin(userData);
        const category = await this.topRepository.getCategoryById(categoryId);
        if (!category)
            throw new common_1.NotFoundException('Top category not found');
        const qb = this.topRepository.items
            .createQueryBuilder('it')
            .innerJoinAndSelect('it.venue', 'venue')
            .leftJoinAndSelect('venue.tags', 'tag')
            .leftJoinAndSelect('venue.user', 'user')
            .where('it.category_id = :categoryId', { categoryId })
            .orderBy('it.order', 'ASC')
            .addOrderBy('venue.created', 'DESC');
        const rows = await qb.getMany();
        const venues = rows.map((r) => r.venue).filter(Boolean);
        return {
            category: this.mapTopCategory(category),
            venues: venues.map((v) => venue_mapper_1.VenueMapper.toResponseDTO(v)),
        };
    }
    mapTopCategory(entity) {
        return {
            id: entity.id,
            title: entity.title,
            slug: entity.slug,
            isActive: entity.isActive,
            order: entity.order,
        };
    }
    slugify(input) {
        return input
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [venue_repository_1.VenueRepository,
        user_repository_1.UserRepository,
        comment_repository_1.CommentRepository,
        app_setting_repository_1.AppSettingRepository,
        venue_view_repository_1.VenueViewRepository,
        rating_venue_repository_1.RatingVenueRepository,
        tag_repository_1.TagRepository,
        complaint_repository_1.ComplaintRepository,
        top_repository_1.TopRepository])
], AdminService);
//# sourceMappingURL=admin.service.js.map