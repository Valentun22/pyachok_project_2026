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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const api_file_decorator_1 = require("../../common/decorators/api-file.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const comment_list_query_dto_1 = require("../comments/dto/req/comment-list.query.dto");
const message_repository_1 = require("../repository/services/message.repository");
const change_password_req_dto_1 = require("./dto/req/change-password.req.dto");
const update_user_dto_1 = require("./dto/req/update-user.dto");
const user_mapper_1 = require("./services/user.mapper");
const users_service_1 = require("./services/users.service");
let UsersController = class UsersController {
    constructor(usersService, messageRepository) {
        this.usersService = usersService;
        this.messageRepository = messageRepository;
    }
    async findMe(userData) {
        const result = await this.usersService.findMe(userData);
        return user_mapper_1.UserMapper.toResponseDTO(result);
    }
    async updateMe(userData, dto) {
        const result = await this.usersService.updateMe(userData, dto);
        return user_mapper_1.UserMapper.toResponseDTO(result);
    }
    async removeMe(userData) {
        return await this.usersService.removeMe(userData);
    }
    async uploadAvatar(avatar, userData) {
        await this.usersService.uploadAvatar(userData, avatar);
    }
    async deleteAvatar(userData) {
        await this.usersService.deleteAvatar(userData);
    }
    async addCriticRole(userData) {
        const result = await this.usersService.addCriticRole(userData);
        return user_mapper_1.UserMapper.toResponseDTO(result);
    }
    async removeCriticRole(userData) {
        const result = await this.usersService.removeCriticRole(userData);
        return user_mapper_1.UserMapper.toResponseDTO(result);
    }
    async addVenueAdminRole(userData) {
        const result = await this.usersService.addVenueAdminRole(userData);
        return user_mapper_1.UserMapper.toResponseDTO(result);
    }
    async removeVenueAdminRole(userData) {
        const result = await this.usersService.removeVenueAdminRole(userData);
        return user_mapper_1.UserMapper.toResponseDTO(result);
    }
    async getMyFavorites(userData) {
        return await this.usersService.getMyFavoriteVenues(userData.userId);
    }
    async getMyComments(userData, query) {
        return await this.usersService.getMyComments(userData, query);
    }
    async getMyRatings(userData, query) {
        return await this.usersService.getMyRatings(userData, query);
    }
    async changePassword(userData, dto) {
        await this.usersService.changePassword(userData, dto.oldPassword, dto.newPassword);
    }
    async getUnreadCount(userData) {
        const count = await this.messageRepository.countUnread(userData.userId);
        return { count };
    }
    async getFollowers(userData) {
        const users = await this.usersService.getFollowers(userData);
        return users.map((u) => user_mapper_1.UserMapper.toResponseDTO(u));
    }
    async getFollowing(userData) {
        const users = await this.usersService.getFollowing(userData);
        return users.map((u) => user_mapper_1.UserMapper.toResponseDTO(u));
    }
    async isFollowed(userData, userId) {
        const result = await this.usersService.checkIsFollowed(userData.userId, userId);
        return { isFollowed: result };
    }
    async findOne(userData, userId) {
        const result = await this.usersService.findOne(userId);
        return user_mapper_1.UserMapper.toResponseDTO(result, userData?.userId ?? null);
    }
    async follow(userData, userId) {
        await this.usersService.follow(userData, userId);
    }
    async unfollow(userData, userId) {
        await this.usersService.unfollow(userData, userId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Conflict' }),
    (0, common_1.Get)('me'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/user.res.dto").UserResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findMe", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Conflict' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, common_1.Put)('me'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/user.res.dto").UserResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateMe", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Conflict' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'User has been removed' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)('me'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeMe", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, api_file_decorator_1.ApiFile)('avatar', false, false),
    (0, common_1.Post)('me/avatar'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadAvatar", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)('me/avatar'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteAvatar", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('me/critic'),
    openapi.ApiResponse({ status: 201, type: require("./dto/res/user.res.dto").UserResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addCriticRole", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('me/critic'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/user.res.dto").UserResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeCriticRole", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('me/venue-admin'),
    openapi.ApiResponse({ status: 201, type: require("./dto/res/user.res.dto").UserResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addVenueAdminRole", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('me/venue-admin'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/user.res.dto").UserResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeVenueAdminRole", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('me/favorites'),
    openapi.ApiResponse({ status: 200, type: [require("../venue/dto/res/venue.res.dto").VenueResDto] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMyFavorites", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('me/comments'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/my-comment-list.res.dto").MyCommentListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_list_query_dto_1.CommentListQueryDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMyComments", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('me/ratings'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/my-rating-list.res.dto").MyRatingListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_list_query_dto_1.CommentListQueryDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMyRatings", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Patch)('me/password'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_req_dto_1.ChangePasswordReqDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('me/messages/unread-count'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUnreadCount", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('me/followers'),
    openapi.ApiResponse({ status: 200, type: [require("./dto/res/user.res.dto").UserResDto] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFollowers", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('me/following'),
    openapi.ApiResponse({ status: 200, type: [require("./dto/res/user.res.dto").UserResDto] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFollowing", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':userId/is-followed'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "isFollowed", null);
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)(':userId'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/user.res.dto").UserResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Post)(':userId/follow'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "follow", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':userId/follow'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "unfollow", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        message_repository_1.MessageRepository])
], UsersController);
//# sourceMappingURL=users.controller.js.map