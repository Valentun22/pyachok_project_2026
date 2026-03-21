"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueListItemResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_venue_res_dto_1 = require("./base-venue.res.dto");
class VenueListItemResDto extends (0, swagger_1.PickType)(base_venue_res_dto_1.BaseVenueResDto, [
    'id',
    'name',
    'avatarVenue',
    'created',
    'city',
    'averageCheck',
    'categories',
    'description',
    'tags',
    'ratingAvg',
    'ratingCount',
    'isActive',
    'isModerated',
    'isLiked',
    'likesCount',
    'user',
    'isFavorite',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.VenueListItemResDto = VenueListItemResDto;
//# sourceMappingURL=venue-list-item.res.dto.js.map