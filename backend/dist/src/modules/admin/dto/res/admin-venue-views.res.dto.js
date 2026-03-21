"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminVenueViewsTimePointResDto = exports.AdminVenueViewsSummaryResDto = void 0;
const openapi = require("@nestjs/swagger");
class AdminVenueViewsSummaryResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { total: { required: true, type: () => Number }, uniqueUsers: { required: true, type: () => Number }, uniqueIps: { required: true, type: () => Number } };
    }
}
exports.AdminVenueViewsSummaryResDto = AdminVenueViewsSummaryResDto;
class AdminVenueViewsTimePointResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { bucket: { required: true, type: () => String }, count: { required: true, type: () => Number } };
    }
}
exports.AdminVenueViewsTimePointResDto = AdminVenueViewsTimePointResDto;
//# sourceMappingURL=admin-venue-views.res.dto.js.map