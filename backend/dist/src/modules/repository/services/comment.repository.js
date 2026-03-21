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
exports.CommentRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("../../../database/entities/comment.entity");
let CommentRepository = class CommentRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(comment_entity_1.CommentEntity, dataSource.manager);
        this.dataSource = dataSource;
    }
    async getListByVenue(currentUserId, venueId, query) {
        const qb = this.createQueryBuilder('comment');
        qb.leftJoinAndSelect('comment.user', 'user');
        qb.leftJoinAndSelect('user.followings', 'following', 'following.follower_id = :currentUserId');
        qb.setParameter('currentUserId', currentUserId);
        qb.andWhere('comment.venue_id = :venueId', { venueId });
        qb.orderBy('comment.created', 'DESC');
        qb.take(query.limit);
        qb.skip(query.offset);
        return await qb.getManyAndCount();
    }
    async getByIdOrFail(currentUserId, commentId) {
        const qb = this.createQueryBuilder('comment');
        qb.leftJoinAndSelect('comment.user', 'user');
        qb.andWhere('comment.id = :commentId', { commentId });
        return await qb.getOneOrFail();
    }
    async findMyComments(userId, limit, offset) {
        const qb = this.createQueryBuilder('comment');
        qb.leftJoinAndSelect('comment.user', 'user');
        qb.leftJoinAndSelect('comment.venue', 'venue');
        qb.where('comment.user_id = :userId', { userId });
        qb.orderBy('comment.created', 'DESC');
        qb.take(limit);
        qb.skip(offset);
        return await qb.getManyAndCount();
    }
    async getAllComments(limit, offset, search) {
        const qb = this.createQueryBuilder('comment');
        qb.leftJoinAndSelect('comment.user', 'user');
        qb.leftJoinAndSelect('comment.venue', 'venue');
        if (search) {
            qb.andWhere('(comment.title ILIKE :s OR comment.body ILIKE :s OR venue.name ILIKE :s OR user.name ILIKE :s)', { s: `%${search}%` });
        }
        qb.orderBy('comment.created', 'DESC');
        qb.take(limit);
        qb.skip(offset);
        return await qb.getManyAndCount();
    }
};
exports.CommentRepository = CommentRepository;
exports.CommentRepository = CommentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CommentRepository);
//# sourceMappingURL=comment.repository.js.map