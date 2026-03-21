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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const role_enum_1 = require("../../../database/entities/enums/role.enum");
const auth_cache_service_1 = require("../../auth/services/auth-cache.service");
const comment_mapper_1 = require("../../comments/services/comment.mapper");
const content_type_enum_1 = require("../../file-storage/enums/content-type.enum");
const file_storage_service_1 = require("../../file-storage/services/file-storage.service");
const logger_service_1 = require("../../logger/logger.service");
const comment_repository_1 = require("../../repository/services/comment.repository");
const follow_repository_1 = require("../../repository/services/follow.repository");
const rating_venue_repository_1 = require("../../repository/services/rating-venue.repository");
const user_repository_1 = require("../../repository/services/user.repository");
const venue_mapper_1 = require("../../venue/services/venue.mapper");
let UsersService = class UsersService {
    constructor(fileStorageService, logger, userRepository, authCacheService, followRepository, commentRepository, ratingVenueRepository) {
        this.fileStorageService = fileStorageService;
        this.logger = logger;
        this.userRepository = userRepository;
        this.authCacheService = authCacheService;
        this.followRepository = followRepository;
        this.commentRepository = commentRepository;
        this.ratingVenueRepository = ratingVenueRepository;
    }
    async findMe(userData) {
        return await this.userRepository.findOneBy({ id: userData.userId });
    }
    async updateMe(userData, dto) {
        const user = await this.userRepository.findOneBy({ id: userData.userId });
        this.userRepository.merge(user, dto);
        return await this.userRepository.save(user);
    }
    async removeMe(userData) {
        await this.userRepository.delete({ id: userData.userId });
        await this.authCacheService.deleteToken(userData.userId, userData.deviceId);
    }
    async findOne(userId) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.followings', 'follow')
            .where('user.id = :userId', { userId })
            .getOne();
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        return user;
    }
    async follow(userData, userId) {
        if (userData.userId === userId) {
            throw new common_1.ConflictException('You cannot follow yourself');
        }
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        const follow = await this.followRepository.findOneBy({
            follower_id: userData.userId,
            following_id: userId,
        });
        if (follow) {
            return;
        }
        await this.followRepository.save(this.followRepository.create({
            follower_id: userData.userId,
            following_id: userId,
        }));
    }
    async unfollow(userData, userId) {
        if (userData.userId === userId) {
            throw new common_1.ConflictException('You cannot unfollow yourself');
        }
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        const follow = await this.followRepository.findOneBy({
            follower_id: userData.userId,
            following_id: userId,
        });
        if (!follow) {
            return;
        }
        await this.followRepository.delete({ id: follow.id });
    }
    async isEmailExistOrThrow(email) {
        const user = await this.userRepository.findOneBy({ email });
        if (user) {
            throw new common_1.ConflictException('Користувач з таким email вже зареєстрований');
        }
    }
    async uploadAvatar(userData, avatar) {
        const image = await this.fileStorageService.uploadFile(avatar, content_type_enum_1.ContentType.AVATAR, userData.userId);
        await this.userRepository.update(userData.userId, { image });
    }
    async deleteAvatar(userData) {
        const user = await this.userRepository.findOneBy({ id: userData.userId });
        if (user.image) {
            await this.fileStorageService.deleteFile(user.image);
            await this.userRepository.save(this.userRepository.merge(user, { image: null }));
        }
    }
    async addCriticRole(userData) {
        const user = await this.userRepository.findOne({
            where: { id: userData.userId },
            select: ['id', 'name', 'email', 'bio', 'image', 'role'],
        });
        const roles = new Set(user.role ?? []);
        roles.add(role_enum_1.RoleUserEnum.USER);
        roles.add(role_enum_1.RoleUserEnum.CRITIC);
        user.role = Array.from(roles);
        return await this.userRepository.save(user);
    }
    async removeCriticRole(userData) {
        const user = await this.userRepository.findOne({
            where: { id: userData.userId },
            select: ['id', 'name', 'email', 'bio', 'image', 'role'],
        });
        const roles = new Set(user.role ?? []);
        roles.delete(role_enum_1.RoleUserEnum.CRITIC);
        if (roles.size === 0)
            roles.add(role_enum_1.RoleUserEnum.USER);
        user.role = Array.from(roles);
        return await this.userRepository.save(user);
    }
    async addVenueAdminRole(userData) {
        const user = await this.userRepository.findOne({
            where: { id: userData.userId },
            select: ['id', 'name', 'email', 'bio', 'image', 'role'],
        });
        const roles = new Set(user.role ?? []);
        roles.add(role_enum_1.RoleUserEnum.USER);
        roles.add(role_enum_1.RoleUserEnum.VENUE_ADMIN);
        user.role = Array.from(roles);
        return await this.userRepository.save(user);
    }
    async removeVenueAdminRole(userData) {
        const user = await this.userRepository.findOne({
            where: { id: userData.userId },
            select: ['id', 'name', 'email', 'bio', 'image', 'role'],
        });
        const roles = new Set(user.role ?? []);
        roles.delete(role_enum_1.RoleUserEnum.VENUE_ADMIN);
        if (roles.size === 0)
            roles.add(role_enum_1.RoleUserEnum.USER);
        user.role = Array.from(roles);
        return await this.userRepository.save(user);
    }
    async getMyFavoriteVenues(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['favoriteVenues'],
        });
        const venues = user.favoriteVenues ?? [];
        return venues.map((v) => venue_mapper_1.VenueMapper.toResponseDTO(v, { isFavorite: true }));
    }
    async getMyRatings(userData, query) {
        const limit = query.limit ?? 10;
        const offset = query.offset ?? 0;
        const [rows, total] = await this.ratingVenueRepository.findMyRatedVenues(userData.userId, limit, offset);
        const data = rows.map((rv) => ({
            ...venue_mapper_1.VenueMapper.toResponseListItemDTO(rv.venue),
            myRating: rv.rating,
        }));
        return { data, total, limit, offset };
    }
    async getMyComments(userData, query) {
        const limit = query.limit ?? 10;
        const offset = query.offset ?? 0;
        const [comments, total] = await this.commentRepository.findMyComments(userData.userId, limit, offset);
        return {
            data: comments.map((c) => comment_mapper_1.CommentMapper.toResponseDTO(userData, c)),
            total,
            limit,
            offset,
        };
    }
    async checkIsFollowed(currentUserId, targetUserId) {
        const follow = await this.followRepository.findOneBy({
            follower_id: currentUserId,
            following_id: targetUserId,
        });
        return !!follow;
    }
    async getFollowers(userData) {
        const follows = await this.followRepository.find({
            where: { following_id: userData.userId },
            relations: ['followers'],
        });
        return follows.map((f) => f.followers).filter(Boolean);
    }
    async getFollowing(userData) {
        const follows = await this.followRepository.find({
            where: { follower_id: userData.userId },
            relations: ['followings'],
        });
        return follows.map((f) => f.followings).filter(Boolean);
    }
    async changePassword(userData, oldPassword, newPassword) {
        const user = await this.userRepository.findOne({
            where: { id: userData.userId },
            select: { id: true, password: true },
        });
        if (!user)
            throw new common_1.NotFoundException('Користувача не знайдено');
        if (!user.password) {
            throw new common_1.BadRequestException('Акаунт не має пароля (OAuth вхід)');
        }
        const isValid = await bcrypt.compare(oldPassword, user.password);
        if (!isValid)
            throw new common_1.BadRequestException('Поточний пароль невірний');
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(user.id, { password: hashed });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_storage_service_1.FileStorageService,
        logger_service_1.LoggerService,
        user_repository_1.UserRepository,
        auth_cache_service_1.AuthCacheService,
        follow_repository_1.FollowRepository,
        comment_repository_1.CommentRepository,
        rating_venue_repository_1.RatingVenueRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map