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
exports.CommentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const multer_1 = require("multer");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const comment_list_query_dto_1 = require("./dto/req/comment-list.query.dto");
const create_comment_req_dto_1 = require("./dto/req/create-comment.req.dto");
const update_comment_req_dto_1 = require("./dto/req/update-comment.req.dto");
const comment_mapper_1 = require("./services/comment.mapper");
const comment_service_1 = require("./services/comment.service");
const comment_s3_service_1 = require("./services/comment-s3.service");
let CommentController = class CommentController {
    constructor(service, commentS3Service) {
        this.service = service;
        this.commentS3Service = commentS3Service;
    }
    async getListByVenue(userData, venueId, query) {
        const [entities, total] = await this.service.getListByVenue(userData, venueId, query);
        return comment_mapper_1.CommentMapper.toResponseListDTO(userData, entities, total, query);
    }
    async create(userData, venueId, dto) {
        const entity = await this.service.create(userData, venueId, dto);
        const full = await this.service.getById(userData, entity.id);
        return comment_mapper_1.CommentMapper.toResponseDTO(userData, full);
    }
    async getById(userData, commentId) {
        const entity = await this.service.getById(userData, commentId);
        return comment_mapper_1.CommentMapper.toResponseDTO(userData, entity);
    }
    async update(userData, commentId, dto) {
        const entity = await this.service.update(userData, commentId, dto);
        const full = await this.service.getById(userData, entity.id);
        return comment_mapper_1.CommentMapper.toResponseDTO(userData, full);
    }
    async delete(userData, commentId) {
        await this.service.delete(userData, commentId);
    }
    async uploadCheck(file) {
        if (!file)
            throw new common_1.BadRequestException('File is required');
        return await this.commentS3Service.uploadCheck(file);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)('venues/:venueId/comments'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/comment-list.res.dto").CommentListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, comment_list_query_dto_1.CommentListQueryDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getListByVenue", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Post)('venues/:venueId/comments'),
    openapi.ApiResponse({ status: 201, type: require("./dto/res/comment.res.dto").CommentResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('venueId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_comment_req_dto_1.CreateCommentReqDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)('comments/:commentId'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/comment.res.dto").CommentResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Patch)('comments/:commentId'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/comment.res.dto").CommentResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_comment_req_dto_1.UpdateCommentReqDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Not Found' }),
    (0, common_1.Delete)('comments/:commentId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('upload-check'),
    (0, throttler_1.Throttle)({ default: { ttl: 60, limit: 10 } }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const ok = /\/(jpg|jpeg|png)$/i.test(file.mimetype);
            cb(ok ? null : new common_1.BadRequestException('Only jpg/jpeg/png'), ok);
        },
    })),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "uploadCheck", null);
exports.CommentController = CommentController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Comments'),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [comment_service_1.CommentService,
        comment_s3_service_1.CommentS3Service])
], CommentController);
//# sourceMappingURL=comment.controller.js.map