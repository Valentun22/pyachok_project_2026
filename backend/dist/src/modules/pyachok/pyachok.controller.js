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
exports.PyachokController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const create_pyachok_req_dto_1 = require("./dto/req/create-pyachok.req.dto");
const pyachok_list_query_dto_1 = require("./dto/req/pyachok-list.query.dto");
const pyachok_service_1 = require("./services/pyachok.service");
let PyachokController = class PyachokController {
    constructor(service) {
        this.service = service;
    }
    getOpenFeed(query) {
        return this.service.getOpenFeed(query);
    }
    getVenuePublicList(venueId, query) {
        return this.service.getVenuePublicList(venueId, query);
    }
    create(venueId, user, dto) {
        return this.service.create(user.userId, venueId, dto);
    }
    getMy(user, query) {
        return this.service.getMy(user.userId, query);
    }
    updateMy(id, user, dto) {
        return this.service.updateMy(user.userId, id, dto);
    }
    closeMy(id, user) {
        return this.service.closeMy(user.userId, id);
    }
    closeAny(id, user) {
        return this.service.closeAny(user, id);
    }
    deleteMy(id, user) {
        return this.service.deleteMy(user.userId, id);
    }
    deleteAny(id, user) {
        return this.service.deleteAny(user, id);
    }
    getVenueManageList(venueId, user, query) {
        return this.service.getVenueManageList(user, venueId, query);
    }
};
exports.PyachokController = PyachokController;
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Public open feed — all open requests across all venues',
    }),
    (0, common_1.Get)('/pyachok/feed'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pyachok_list_query_dto_1.PyachokListQueryDto]),
    __metadata("design:returntype", void 0)
], PyachokController.prototype, "getOpenFeed", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Public list: open requests by venue' }),
    (0, common_1.Get)('/venues/:venueId/pyachok'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('venueId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pyachok_list_query_dto_1.PyachokListQueryDto]),
    __metadata("design:returntype", void 0)
], PyachokController.prototype, "getVenuePublicList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create request ("Пиячок" button on venue page)' }),
    (0, common_1.Post)('/venues/:venueId/pyachok'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('venueId', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_pyachok_req_dto_1.CreatePyachokReqDto]),
    __metadata("design:returntype", void 0)
], PyachokController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'My requests' }),
    (0, common_1.Get)('/users/me/pyachok'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pyachok_list_query_dto_1.PyachokListQueryDto]),
    __metadata("design:returntype", void 0)
], PyachokController.prototype, "getMy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update my request' }),
    (0, common_1.Patch)('/pyachok/:id'),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/pyachok.entity").PyachokEntity }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_pyachok_req_dto_1.CreatePyachokReqDto]),
    __metadata("design:returntype", void 0)
], PyachokController.prototype, "updateMy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Close my request' }),
    (0, common_1.Patch)('/pyachok/:id/close'),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/pyachok.entity").PyachokEntity }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PyachokController.prototype, "closeMy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Close any request (venue owner/admin)' }),
    (0, common_1.Patch)('/pyachok/:id/close-any'),
    openapi.ApiResponse({ status: 200, type: require("../../database/entities/pyachok.entity").PyachokEntity }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PyachokController.prototype, "closeAny", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete my request' }),
    (0, common_1.Delete)('/pyachok/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PyachokController.prototype, "deleteMy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete any request (venue owner/admin)' }),
    (0, common_1.Delete)('/pyachok/:id/force'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PyachokController.prototype, "deleteAny", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Manage list for venue owner/admin' }),
    (0, common_1.Get)('/venues/:venueId/pyachok/manage'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('venueId', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, pyachok_list_query_dto_1.PyachokListQueryDto]),
    __metadata("design:returntype", void 0)
], PyachokController.prototype, "getVenueManageList", null);
exports.PyachokController = PyachokController = __decorate([
    (0, swagger_1.ApiTags)('Pyachok'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [pyachok_service_1.PyachokService])
], PyachokController);
//# sourceMappingURL=pyachok.controller.js.map