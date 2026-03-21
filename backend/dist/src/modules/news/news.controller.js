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
exports.NewsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const create_news_req_dto_1 = require("./dto/req/create-news.req.dto");
const news_list_query_dto_1 = require("./dto/req/news-list.query.dto");
const update_news_req_dto_1 = require("./dto/req/update-news.req.dto");
const update_news_active_req_dto_1 = require("./dto/req/update-news-active.req.dto");
const news_mapper_1 = require("./services/news.mapper");
const news_service_1 = require("./services/news.service");
let NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    async create(userData, venueId, dto) {
        const entity = await this.newsService.create(userData, venueId, dto);
        return news_mapper_1.NewsMapper.toResponseDTO(entity);
    }
    async update(userData, newsId, dto) {
        const entity = await this.newsService.update(userData, newsId, dto);
        return news_mapper_1.NewsMapper.toResponseDTO(entity);
    }
    async updateActive(userData, newsId, dto) {
        const entity = await this.newsService.updateActive(userData, newsId, dto.isActive);
        return news_mapper_1.NewsMapper.toResponseDTO(entity);
    }
    async getVenueManageList(userData, venueId, query) {
        return await this.newsService.getVenueManageList(userData, venueId, query);
    }
    async delete(userData, newsId) {
        await this.newsService.delete(userData, newsId);
    }
    async getGlobalList(query) {
        return await this.newsService.getGlobalList(query);
    }
    async getVenueList(venueId, query) {
        return await this.newsService.getVenueList(venueId, query);
    }
    async updatePaid(userData, newsId, dto) {
        const entity = await this.newsService.updatePaid(userData, newsId, dto.isActive);
        return news_mapper_1.NewsMapper.toResponseDTO(entity);
    }
};
exports.NewsController = NewsController;
__decorate([
    (0, common_1.Post)('venues/:venueId/news'),
    openapi.ApiResponse({ status: 201, type: require("./dto/res/news.res.dto").NewsResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_news_req_dto_1.CreateNewsReqDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('news/:newsId'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/news.res.dto").NewsResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('newsId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_news_req_dto_1.UpdateNewsReqDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('news/:newsId/active'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/news.res.dto").NewsResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('newsId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_news_active_req_dto_1.UpdateNewsActiveReqDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "updateActive", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('venues/:venueId/news/manage'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/news-list.res.dto").NewsListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, news_list_query_dto_1.NewsListQueryDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getVenueManageList", null);
__decorate([
    (0, common_1.Delete)('news/:newsId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('newsId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('news'),
    (0, skip_auth_decorator_1.SkipAuth)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/news-list.res.dto").NewsListResDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_list_query_dto_1.NewsListQueryDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getGlobalList", null);
__decorate([
    (0, common_1.Get)('venues/:venueId/news'),
    (0, skip_auth_decorator_1.SkipAuth)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/news-list.res.dto").NewsListResDto }),
    __param(0, (0, common_1.Param)('venueId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, news_list_query_dto_1.NewsListQueryDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getVenueList", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('news/:newsId/paid'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/news.res.dto").NewsResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('newsId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_news_active_req_dto_1.UpdateNewsActiveReqDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "updatePaid", null);
exports.NewsController = NewsController = __decorate([
    (0, swagger_1.ApiTags)('News'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
//# sourceMappingURL=news.controller.js.map