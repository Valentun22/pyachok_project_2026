"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueViewsTimePointResDto = exports.VenueViewsSummaryResDto = void 0;
const openapi = require("@nestjs/swagger");
class VenueViewsSummaryResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { total: { required: true, type: () => Number }, uniqueUsers: { required: true, type: () => Number }, uniqueIps: { required: true, type: () => Number } };
    }
}
exports.VenueViewsSummaryResDto = VenueViewsSummaryResDto;
class VenueViewsTimePointResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { bucket: { required: true, type: () => String }, count: { required: true, type: () => Number } };
    }
}
exports.VenueViewsTimePointResDto = VenueViewsTimePointResDto;
//# sourceMappingURL=venue-views.res.dto.js.map