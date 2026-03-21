"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVenueReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_venue_req_dto_1 = require("./base-venue.req.dto");
class CreateVenueReqDto extends (0, swagger_1.PickType)(base_venue_req_dto_1.BaseVenueReqDto, [
    'name',
    'avatarVenue',
    'logoVenue',
    'image',
    'menu',
    'averageCheck',
    'workingHours',
    'city',
    'address',
    'categories',
    'phone',
    'email',
    'website',
    'socials',
    'description',
    'hasWiFi',
    'hasParking',
    'liveMusic',
    'petFriendly',
    'hasTerrace',
    'smokingAllowed',
    'cardPayment',
    'tags',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateVenueReqDto = CreateVenueReqDto;
//# sourceMappingURL=create-venue.req.dto.js.map