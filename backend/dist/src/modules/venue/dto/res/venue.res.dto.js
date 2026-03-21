"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_venue_res_dto_1 = require("./base-venue.res.dto");
class VenueResDto extends (0, swagger_1.PickType)(base_venue_res_dto_1.BaseVenueResDto, [
    'id',
    'created',
    'updated',
    'name',
    'avatarVenue',
    'image',
    'city',
    'address',
    'description',
    'averageCheck',
    'categories',
    'isActive',
    'isModerated',
    'hasWiFi',
    'hasParking',
    'liveMusic',
    'petFriendly',
    'hasTerrace',
    'smokingAllowed',
    'cardPayment',
    'tags',
    'ratingAvg',
    'ratingCount',
    'isLiked',
    'likesCount',
    'user',
    'isFavorite',
    'phone',
    'email',
    'website',
    'socials',
    'menu',
    'workingHours',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.VenueResDto = VenueResDto;
//# sourceMappingURL=venue.res.dto.js.map