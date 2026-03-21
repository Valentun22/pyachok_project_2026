"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const content_type_enum_1 = require("../file-storage/enums/content-type.enum");
const file_storage_service_1 = require("../file-storage/services/file-storage.service");
const complaint_list_query_dto_1 = require("./dto/req/complaint-list.query.dto");
const contact_venue_manager_req_dto_1 = require("./dto/req/contact-venue-manager.req.dto");
const create_complaint_req_dto_1 = require("./dto/req/create-complaint.req.dto");
const create_venue_req_dto_1 = require("./dto/req/create-venue.req.dto");
const set_venue_rating_req_dto_1 = require("./dto/req/set-venue-rating.req.dto");
const update_venue_req_dto_1 = require("./dto/req/update-venue.req.dto");
const venue_list_query_dto_1 = require("./dto/req/venue-list.query.dto");
const venue_views_query_dto_1 = require("./dto/req/venue-views.query.dto");
const venue_mapper_1 = require("./services/venue.mapper");
const venue_service_1 = require("./services/venue.service");
let VenueController = class VenueController {
    constructor(service, fileStorageService) {
        this.service = service;
        this.fileStorageService = fileStorageService;
    }
    async uploadPhoto(userData, photo) {
        const url = await this.fileStorageService.uploadFile(photo, content_type_enum_1.ContentType.VENUE, userData.userId);
        return { url };
    }
    async getList(userData, query) {
        const [entities, total] = await this.service.getList(userData, query);
        return venue_mapper_1.VenueMapper.toResponseListDTO(entities, total, query);
    }
    async create(userData, dto) {
        const result = await this.service.create(userData, dto);
        return venue_mapper_1.VenueMapper.toResponseDTO(result);
    }
    async getById(userData, venueId, req) {
        const result = await this.service.getById(userData, venueId);
        await this.service.logViewSafe({
            venueId,
            userId: userData?.userId,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
        });
        return venue_mapper_1.VenueMapper.toResponseDTO(result);
    }
    async update(userData, venueId, dto) {
        const result = await this.service.update(userData, venueId, dto);
        return venue_mapper_1.VenueMapper.toResponseDTO(result);
    }
    async delete(userData, venueId) {
        await this.service.delete(userData, venueId);
    }
    async like(userData, venueId) {
        const result = await this.service.like(userData, venueId);
        return venue_mapper_1.VenueMapper.toResponseDTO(result);
    }
    async unlike(userData, venueId) {
        const result = await this.service.unlike(userData, venueId);
        return venue_mapper_1.VenueMapper.toResponseDTO(result);
    }
    async addToFavorites(userData, venueId) {
        await this.service.addToFavorites(userData.userId, venueId);
    }
    async removeFromFavorites(userData, venueId) {
        await this.service.removeFromFavorites(userData.userId, venueId);
    }
    async setRating(userData, venueId, dto) {
        await this.service.setRating(userData.userId, venueId, dto.rating);
    }
    async removeRating(userData, venueId) {
        await this.service.removeRating(userData.userId, venueId);
    }
    async contactManager(userData, venueId, dto) {
        await this.service.contactManager(userData, venueId, dto.message);
    }
    async getViewsSummary(userData, venueId, query) {
        return await this.service.getVenueViewsSummary(userData, venueId, query);
    }
    async getViewsTimeSeries(userData, venueId, query) {
        return await this.service.getVenueViewsTimeSeries(userData, venueId, query);
    }
    async createComplaint(userData, venueId, dto) {
        return await this.service.createComplaint(userData, venueId, dto);
    }
    async getComplaintsForVenue(userData, venueId, query) {
        return await this.service.getComplaintsForVenue(userData, venueId, query);
    }
};
exports.VenueController = VenueController;
__decorate([
    (0, common_1.Post)('upload-photo'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "uploadPhoto", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/venue-list.res.dto").VenueListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, venue_list_query_dto_1.VenueListQueryDto]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "getList", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./dto/res/venue.res.dto").VenueResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_venue_req_dto_1.CreateVenueReqDto]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)(':venueId'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/venue.res.dto").VenueResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Patch)(':venueId'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/venue.res.dto").VenueResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_venue_req_dto_1.UpdateVenueReqDto]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Delete)(':venueId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Post)(':venueId/like'),
    openapi.ApiResponse({ status: 201, type: require("./dto/res/venue.res.dto").VenueResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "like", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Delete)(':venueId/like'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/venue.res.dto").VenueResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "unlike", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(':venueId/favorite'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "addToFavorites", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':venueId/favorite'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "removeFromFavorites", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(':venueId/rating'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, set_venue_rating_req_dto_1.SetVenueRatingReqDto]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "setRating", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':venueId/rating'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "removeRating", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Post)(':venueId/contact'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, contact_venue_manager_req_dto_1.ContactVenueManagerReqDto]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "contactManager", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Get)(':venueId/analytics/views/summary'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/venue-views.res.dto").VenueViewsSummaryResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, venue_views_query_dto_1.VenueViewsQueryDto]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "getViewsSummary", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Get)(':venueId/analytics/views/timeseries'),
    openapi.ApiResponse({ status: 200, type: [require("./dto/res/venue-views.res.dto").VenueViewsTimePointResDto] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, venue_views_query_dto_1.VenueViewsQueryDto]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "getViewsTimeSeries", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Post)(':venueId/complaints'),
    openapi.ApiResponse({ status: 201, type: require("./dto/res/complaint.res.dto").ComplaintResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_complaint_req_dto_1.CreateComplaintReqDto]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "createComplaint", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Get)(':venueId/complaints'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/complaint-list.res.dto").ComplaintListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, complaint_list_query_dto_1.ComplaintListQueryDto]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "getComplaintsForVenue", null);
exports.VenueController = VenueController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Venue'),
    (0, common_1.Controller)('venues'),
    __metadata("design:paramtypes", [venue_service_1.VenueService,
        file_storage_service_1.FileStorageService])
], VenueController);
//# sourceMappingURL=venue.controller.js.map