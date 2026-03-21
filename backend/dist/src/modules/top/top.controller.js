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
exports.TopController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const top_service_1 = require("./top.service");
let TopController = class TopController {
    constructor(topService) {
        this.topService = topService;
    }
    async getCategories() {
        return await this.topService.getCategories();
    }
    async getCategoryBySlug(slug) {
        return await this.topService.getCategoryBySlug(slug);
    }
};
exports.TopController = TopController;
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)('categories'),
    openapi.ApiResponse({ status: 200, type: [require("./dto/res/top-category.res.dto").TopCategoryResDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TopController.prototype, "getCategories", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)('categories/:slug'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/top-category-with-venues.res.dto").TopCategoryWithVenuesResDto }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopController.prototype, "getCategoryBySlug", null);
exports.TopController = TopController = __decorate([
    (0, swagger_1.ApiTags)('Top'),
    (0, common_1.Controller)('top'),
    __metadata("design:paramtypes", [top_service_1.TopService])
], TopController);
//# sourceMappingURL=top.controller.js.map