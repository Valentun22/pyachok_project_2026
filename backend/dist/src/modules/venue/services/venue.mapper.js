"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueMapper = void 0;
const user_mapper_1 = require("../../users/services/user.mapper");
class VenueMapper {
    static toResponseListDTO(entities, total, query) {
        return {
            data: entities.map((e) => this.toResponseListItemDTO(e)),
            total,
            ...query,
        };
    }
    static toResponseListItemDTO(entity, opts) {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            created: entity.created,
            city: entity.city,
            avatarVenue: entity.avatarVenue,
            isActive: entity.isActive,
            isModerated: entity.isModerated,
            tags: entity.tags?.map((tag) => tag.name) ?? [],
            ratingAvg: entity.ratingAvg ?? undefined,
            ratingCount: entity.ratingCount ?? undefined,
            isLiked: (entity.likes?.length ?? 0) > 0,
            likesCount: entity.likesCount ?? entity.likes?.length ?? 0,
            user: entity.user ? user_mapper_1.UserMapper.toResponseDTO(entity.user) : null,
            isFavorite: opts?.isFavorite ?? entity.isFavorite ?? false,
        };
    }
    static toResponseDTO(entity, opts) {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            created: entity.created,
            avatarVenue: entity.avatarVenue,
            image: entity.image ?? [],
            updated: entity.updated,
            city: entity.city,
            address: entity.address,
            averageCheck: entity.averageCheck,
            categories: entity.categories,
            isActive: entity.isActive,
            isModerated: entity.isModerated,
            hasWiFi: entity.hasWiFi,
            hasParking: entity.hasParking,
            liveMusic: entity.liveMusic,
            petFriendly: entity.petFriendly,
            hasTerrace: entity.hasTerrace,
            smokingAllowed: entity.smokingAllowed,
            cardPayment: entity.cardPayment,
            tags: entity.tags?.map((tag) => tag.name) ?? [],
            ratingAvg: entity.ratingAvg ?? undefined,
            ratingCount: entity.ratingCount ?? undefined,
            isLiked: (entity.likes?.length ?? 0) > 0,
            likesCount: entity.likesCount ?? entity.likes?.length ?? 0,
            user: entity.user ? user_mapper_1.UserMapper.toResponseDTO(entity.user) : null,
            isFavorite: opts?.isFavorite ?? entity.isFavorite ?? false,
            phone: entity.phone ?? null,
            email: entity.email ?? null,
            website: entity.website ?? null,
            socials: entity.socials ?? null,
            menu: entity.menu ?? null,
            workingHours: entity.workingHours ?? null,
        };
    }
}
exports.VenueMapper = VenueMapper;
//# sourceMappingURL=venue.mapper.js.map