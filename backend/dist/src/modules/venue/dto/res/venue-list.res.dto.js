"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueListResDto = void 0;
const openapi = require("@nestjs/swagger");
const venue_list_query_dto_1 = require("../req/venue-list.query.dto");
class VenueListResDto extends venue_list_query_dto_1.VenueListQueryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("./venue-list-item.res.dto").VenueListItemResDto] }, total: { required: true, type: () => Number } };
    }
}
exports.VenueListResDto = VenueListResDto;
//# sourceMappingURL=venue-list.res.dto.js.map