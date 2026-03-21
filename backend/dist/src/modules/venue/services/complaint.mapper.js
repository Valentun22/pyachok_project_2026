"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintMapper = void 0;
class ComplaintMapper {
    static toResponseDTO(entity) {
        return {
            id: entity.id,
            venueId: entity.venue_id,
            userId: entity.user_id,
            type: entity.type,
            targetId: entity.targetId,
            reason: entity.reason,
            status: entity.status,
            created: entity.created,
            user: entity.user
                ? {
                    id: entity.user.id,
                    name: entity.user.name,
                    image: entity.user.image,
                }
                : undefined,
            venue: entity.venue
                ? {
                    id: entity.venue.id,
                    name: entity.venue.name,
                }
                : undefined,
        };
    }
    static toListResponseDTO(data, total, limit, offset) {
        return {
            data: data.map(this.toResponseDTO),
            total,
            limit,
            offset,
        };
    }
}
exports.ComplaintMapper = ComplaintMapper;
//# sourceMappingURL=complaint.mapper.js.map