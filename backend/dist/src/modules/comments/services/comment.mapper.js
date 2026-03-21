"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentMapper = void 0;
const role_enum_1 = require("../../../database/entities/enums/role.enum");
const user_mapper_1 = require("../../users/services/user.mapper");
class CommentMapper {
    static toResponseListDTO(userData, entities, total, query) {
        return {
            data: entities.map((e) => this.toResponseListItemDTO(userData, e)),
            total,
            limit: query.limit ?? 10,
            offset: query.offset ?? 0,
        };
    }
    static toResponseListItemDTO(userData, entity) {
        const roles = entity.user?.role ?? [];
        return {
            id: entity.id,
            title: entity.title,
            body: entity.body,
            image_check: entity.image_check ?? null,
            rating: entity.rating,
            created: entity.created,
            updated: entity.updated,
            recommendation: entity.recommendation ?? null,
            user: user_mapper_1.UserMapper.toResponseDTO(entity.user),
            isCritic: roles.includes(role_enum_1.RoleUserEnum.CRITIC),
            isOwner: entity.user_id === userData.userId,
        };
    }
    static toResponseDTO(userData, entity) {
        return {
            ...this.toResponseListItemDTO(userData, entity),
            venueId: entity.venue_id,
        };
    }
}
exports.CommentMapper = CommentMapper;
//# sourceMappingURL=comment.mapper.js.map