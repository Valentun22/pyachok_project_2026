"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsMapper = void 0;
class NewsMapper {
    static toListItemDTO(entity) {
        return {
            id: entity.id,
            title: entity.title,
            body: entity.body,
            type: entity.type,
            isActive: entity.isActive,
            isPaid: entity.isPaid ?? false,
            avatarNews: entity.avatarNews ?? null,
            images: entity.images ?? null,
            created: entity.created,
            updated: entity.updated,
            venue: {
                id: entity.venue?.id,
                name: entity.venue?.name,
                avatarVenue: entity.venue?.avatarVenue ?? null,
                logoVenue: entity.venue?.logoVenue ?? null,
            },
        };
    }
    static toListDTO(entities, total, query) {
        return {
            data: entities.map(this.toListItemDTO),
            total,
            limit: query.limit ?? 10,
            offset: query.offset ?? 0,
        };
    }
    static toResponseDTO(entity) {
        return {
            id: entity.id,
            title: entity.title,
            body: entity.body,
            type: entity.type,
            isActive: entity.isActive,
            isPaid: entity.isPaid ?? false,
            avatarNews: entity.avatarNews ?? null,
            images: entity.images ?? null,
            venueId: entity.venue_id,
            created: entity.created,
            updated: entity.updated,
        };
    }
}
exports.NewsMapper = NewsMapper;
//# sourceMappingURL=news.mapper.js.map