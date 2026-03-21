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
exports.AdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const venue_list_query_dto_1 = require("../venue/dto/req/venue-list.query.dto");
const admin_add_venue_to_top_category_req_dto_1 = require("./dto/req/admin-add-venue-to-top-category.req.dto");
const admin_complaint_list_query_dto_1 = require("./dto/req/admin-complaint-list.query.dto");
const admin_create_top_category_req_dto_1 = require("./dto/req/admin-create-top-category.req.dto");
const admin_reorder_top_categories_req_dto_1 = require("./dto/req/admin-reorder-top-categories.req.dto");
const admin_reorder_top_category_venues_req_dto_1 = require("./dto/req/admin-reorder-top-category-venues.req.dto");
const admin_set_venue_rating_req_dto_1 = require("./dto/req/admin-set-venue-rating.req.dto");
const admin_update_comment_req_dto_1 = require("./dto/req/admin-update-comment.req.dto");
const admin_update_complaint_status_req_dto_1 = require("./dto/req/admin-update-complaint-status.req.dto");
const admin_update_top_category_req_dto_1 = require("./dto/req/admin-update-top-category.req.dto");
const admin_update_user_req_dto_1 = require("./dto/req/admin-update-user.req.dto");
const admin_update_venue_req_dto_1 = require("./dto/req/admin-update-venue.req.dto");
const admin_user_list_query_dto_1 = require("./dto/req/admin-user-list.query.dto.");
const admin_venue_list_query_dto_1 = require("./dto/req/admin-venue-list.query.dto");
const admin_venue_views_query_dto_1 = require("./dto/req/admin-venue-views.query.dto");
const admin_service_1 = require("./services/admin.service");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getPendingVenues(userData, query) {
        return await this.adminService.getPendingVenues(userData, query);
    }
    async getAllVenues(userData, query) {
        return await this.adminService.getAllVenues(userData, query);
    }
    async approveVenue(userData, venueId) {
        await this.adminService.approveVenue(userData, venueId);
    }
    async toggleVenueActive(userData, venueId) {
        await this.adminService.toggleVenueActive(userData, venueId);
    }
    async updateVenue(userData, venueId, dto) {
        return await this.adminService.updateVenue(userData, venueId, dto);
    }
    async deleteVenue(userData, venueId) {
        await this.adminService.deleteVenue(userData, venueId);
    }
    async getAllUsers(userData, query) {
        return await this.adminService.getAllUsers(userData, query);
    }
    async updateUser(userData, userId, dto) {
        return await this.adminService.updateUser(userData, userId, dto);
    }
    async deleteUser(userData, userId) {
        await this.adminService.deleteUser(userData, userId);
    }
    async reassignVenueOwner(userData, venueId, body) {
        await this.adminService.reassignVenueOwner(userData, venueId, body.userId);
    }
    async getAllComments(userData, limit, offset, search) {
        return await this.adminService.getAllComments(userData, limit ? parseInt(limit) : 20, offset ? parseInt(offset) : 0, search);
    }
    async updateComment(userData, commentId, dto) {
        return await this.adminService.updateComment(userData, commentId, dto);
    }
    async deleteComment(userData, commentId) {
        await this.adminService.deleteComment(userData, commentId);
    }
    async setVenueRatingForUser(userData, venueId, dto) {
        await this.adminService.setVenueRatingForUser(userData, venueId, dto.userId, dto.rating);
    }
    async removeVenueRatingForUser(userData, venueId, userId) {
        await this.adminService.removeVenueRatingForUser(userData, venueId, userId);
    }
    async getVenueViewsSummary(userData, venueId, query) {
        return await this.adminService.getVenueViewsSummary(userData, venueId, query);
    }
    async getVenueViewsTimeSeries(userData, venueId, query) {
        return await this.adminService.getVenueViewsTimeSeries(userData, venueId, query);
    }
    async getComplaints(userData, query) {
        return await this.adminService.getComplaints(userData, query);
    }
    async getComplaintById(userData, complaintId) {
        return await this.adminService.getComplaintById(userData, complaintId);
    }
    async updateComplaintStatus(userData, complaintId, dto) {
        return await this.adminService.updateComplaintStatus(userData, complaintId, dto);
    }
    async getPublicCmsSettings() {
        return await this.adminService.getPublicCmsSettings();
    }
    async getCmsSettings(userData) {
        return await this.adminService.getCmsSettings(userData);
    }
    async updateCmsSettings(userData, dto) {
        return await this.adminService.updateCmsSettings(userData, dto);
    }
    async getTopCategories(userData) {
        return await this.adminService.getTopCategories(userData);
    }
    async createTopCategory(userData, dto) {
        return await this.adminService.createTopCategory(userData, dto);
    }
    async reorderTopCategories(userData, dto) {
        await this.adminService.reorderTopCategories(userData, dto);
    }
    async getTopCategoryWithVenues(userData, categoryId) {
        return await this.adminService.getTopCategoryWithVenues(userData, categoryId);
    }
    async updateTopCategory(userData, categoryId, dto) {
        return await this.adminService.updateTopCategory(userData, categoryId, dto);
    }
    async deleteTopCategory(userData, categoryId) {
        await this.adminService.deleteTopCategory(userData, categoryId);
    }
    async addVenueToTopCategory(userData, categoryId, dto) {
        await this.adminService.addVenueToTopCategory(userData, categoryId, dto);
    }
    async reorderTopCategoryVenues(userData, categoryId, dto) {
        await this.adminService.reorderTopCategoryVenues(userData, categoryId, dto);
    }
    async removeVenueFromTopCategory(userData, categoryId, venueId) {
        await this.adminService.removeVenueFromTopCategory(userData, categoryId, venueId);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('venues/pending'),
    openapi.ApiResponse({ status: 200, type: require("../venue/dto/res/venue-list.res.dto").VenueListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, venue_list_query_dto_1.VenueListQueryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPendingVenues", null);
__decorate([
    (0, common_1.Get)('venues'),
    openapi.ApiResponse({ status: 200, type: require("../venue/dto/res/venue-list.res.dto").VenueListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_venue_list_query_dto_1.AdminVenueListQueryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllVenues", null);
__decorate([
    (0, common_1.Patch)('venues/:venueId/moderate'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveVenue", null);
__decorate([
    (0, common_1.Patch)('venues/:venueId/active'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "toggleVenueActive", null);
__decorate([
    (0, common_1.Patch)('venues/:venueId'),
    openapi.ApiResponse({ status: 200, type: require("../venue/dto/res/venue.res.dto").VenueResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_update_venue_req_dto_1.AdminUpdateVenueReqDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateVenue", null);
__decorate([
    (0, common_1.Delete)('venues/:venueId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteVenue", null);
__decorate([
    (0, common_1.Get)('users'),
    openapi.ApiResponse({ status: 200, type: require("./dto/req/admin-user-list.res.dto").AdminUserListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_user_list_query_dto_1.AdminUserListQueryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Patch)('users/:userId'),
    openapi.ApiResponse({ status: 200, type: require("../users/dto/res/user.res.dto").UserResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_update_user_req_dto_1.AdminUpdateUserReqDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('users/:userId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Patch)('venues/:venueId/owner'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "reassignVenueOwner", null);
__decorate([
    (0, common_1.Get)('comments'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllComments", null);
__decorate([
    (0, common_1.Patch)('comments/:commentId'),
    openapi.ApiResponse({ status: 200, type: require("../comments/dto/res/comment.res.dto").CommentResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_update_comment_req_dto_1.AdminUpdateCommentReqDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)('comments/:commentId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Patch)('venues/:venueId/rating'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_set_venue_rating_req_dto_1.AdminSetVenueRatingReqDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "setVenueRatingForUser", null);
__decorate([
    (0, common_1.Delete)('venues/:venueId/rating/:userId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeVenueRatingForUser", null);
__decorate([
    (0, common_1.Get)('analytics/venues/:venueId/views/summary'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/admin-venue-views.res.dto").AdminVenueViewsSummaryResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_venue_views_query_dto_1.AdminVenueViewsQueryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getVenueViewsSummary", null);
__decorate([
    (0, common_1.Get)('analytics/venues/:venueId/views/timeseries'),
    openapi.ApiResponse({ status: 200, type: [require("./dto/res/admin-venue-views.res.dto").AdminVenueViewsTimePointResDto] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_venue_views_query_dto_1.AdminVenueViewsQueryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getVenueViewsTimeSeries", null);
__decorate([
    (0, common_1.Get)('complaints'),
    openapi.ApiResponse({ status: 200, type: require("../venue/dto/res/complaint-list.res.dto").ComplaintListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_complaint_list_query_dto_1.AdminComplaintListQueryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getComplaints", null);
__decorate([
    (0, common_1.Get)('complaints/:complaintId'),
    openapi.ApiResponse({ status: 200, type: require("../venue/dto/res/complaint.res.dto").ComplaintResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('complaintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getComplaintById", null);
__decorate([
    (0, common_1.Patch)('complaints/:complaintId/status'),
    openapi.ApiResponse({ status: 200, type: require("../venue/dto/res/complaint.res.dto").ComplaintResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('complaintId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_update_complaint_status_req_dto_1.AdminUpdateComplaintStatusReqDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateComplaintStatus", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)('settings/public'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPublicCmsSettings", null);
__decorate([
    (0, common_1.Get)('settings'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getCmsSettings", null);
__decorate([
    (0, common_1.Patch)('settings'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateCmsSettings", null);
__decorate([
    (0, common_1.Get)('top/categories'),
    openapi.ApiResponse({ status: 200, type: [require("../top/dto/res/top-category.res.dto").TopCategoryResDto] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTopCategories", null);
__decorate([
    (0, common_1.Post)('top/categories'),
    openapi.ApiResponse({ status: 201, type: require("../top/dto/res/top-category.res.dto").TopCategoryResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_create_top_category_req_dto_1.AdminCreateTopCategoryReqDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createTopCategory", null);
__decorate([
    (0, common_1.Patch)('top/categories/order'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_reorder_top_categories_req_dto_1.AdminReorderTopCategoriesReqDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "reorderTopCategories", null);
__decorate([
    (0, common_1.Get)('top/categories/:categoryId'),
    openapi.ApiResponse({ status: 200, type: require("../top/dto/res/top-category-with-venues.res.dto").TopCategoryWithVenuesResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTopCategoryWithVenues", null);
__decorate([
    (0, common_1.Patch)('top/categories/:categoryId'),
    openapi.ApiResponse({ status: 200, type: require("../top/dto/res/top-category.res.dto").TopCategoryResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('categoryId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_update_top_category_req_dto_1.AdminUpdateTopCategoryReqDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateTopCategory", null);
__decorate([
    (0, common_1.Delete)('top/categories/:categoryId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteTopCategory", null);
__decorate([
    (0, common_1.Post)('top/categories/:categoryId/venues'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('categoryId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_add_venue_to_top_category_req_dto_1.AdminAddVenueToTopCategoryReqDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addVenueToTopCategory", null);
__decorate([
    (0, common_1.Patch)('top/categories/:categoryId/venues/order'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('categoryId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, admin_reorder_top_category_venues_req_dto_1.AdminReorderTopCategoryVenuesReqDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "reorderTopCategoryVenues", null);
__decorate([
    (0, common_1.Delete)('top/categories/:categoryId/venues/:venueId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('categoryId')),
    __param(2, (0, common_1.Param)('venueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeVenueFromTopCategory", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Admin'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map