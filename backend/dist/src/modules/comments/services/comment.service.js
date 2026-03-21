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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../../../database/entities/enums/role.enum");
const comment_repository_1 = require("../../repository/services/comment.repository");
const user_repository_1 = require("../../repository/services/user.repository");
const venue_repository_1 = require("../../repository/services/venue.repository");
let CommentService = class CommentService {
    constructor(commentRepository, venueRepository, userRepository) {
        this.commentRepository = commentRepository;
        this.venueRepository = venueRepository;
        this.userRepository = userRepository;
    }
    async getListByVenue(userData, venueId, query) {
        await this.checkIsVenueExistOrThrow(venueId);
        return await this.commentRepository.getListByVenue(userData.userId, venueId, query);
    }
    async create(userData, venueId, dto) {
        await this.checkIsVenueExistOrThrow(venueId);
        await this.assertRecommendationPermissions(userData.userId, dto);
        const comment = this.commentRepository.create({
            ...dto,
            user_id: userData.userId,
            venue_id: venueId,
        });
        return await this.commentRepository.save(comment);
    }
    async getById(userData, commentId) {
        try {
            return await this.commentRepository.getByIdOrFail(userData.userId, commentId);
        }
        catch {
            throw new common_1.NotFoundException('Comment not found');
        }
    }
    async update(userData, commentId, dto) {
        const comment = await this.getById(userData, commentId);
        if (comment.user_id !== userData.userId) {
            throw new common_1.ForbiddenException('You can update only your comment');
        }
        await this.assertRecommendationPermissions(userData.userId, dto);
        Object.assign(comment, dto);
        return await this.commentRepository.save(comment);
    }
    async delete(userData, commentId) {
        const comment = await this.getById(userData, commentId);
        if (comment.user_id !== userData.userId) {
            throw new common_1.ForbiddenException('You can delete only your comment');
        }
        await this.commentRepository.remove(comment);
    }
    async assertRecommendationPermissions(userId, dto) {
        if (dto.recommendation === undefined)
            return;
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['id', 'role'],
        });
        const isCritic = (user?.role ?? []).includes(role_enum_1.RoleUserEnum.CRITIC);
        if (!isCritic) {
            throw new common_1.ForbiddenException('Only critic can set recommend / not recommend marker');
        }
    }
    async checkIsVenueExistOrThrow(venueId) {
        const venue = await this.venueRepository.findOneBy({ id: venueId });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comment_repository_1.CommentRepository,
        venue_repository_1.VenueRepository,
        user_repository_1.UserRepository])
], CommentService);
//# sourceMappingURL=comment.service.js.map