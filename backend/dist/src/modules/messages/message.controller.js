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
exports.MessageController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const send_message_req_dto_1 = require("./dto/req/send-message.req.dto");
const message_service_1 = require("./services/message.service");
let MessageController = class MessageController {
    constructor(service) {
        this.service = service;
    }
    inbox(user, limit, offset) {
        return this.service.getInbox(user, Number(limit) || 20, Number(offset) || 0);
    }
    sent(user, limit, offset) {
        return this.service.getSent(user, Number(limit) || 20, Number(offset) || 0);
    }
    unreadCount(user) {
        return this.service.countUnread(user);
    }
    markAllRead(user) {
        return this.service.markAllRead(user);
    }
    send(recipientId, user, dto) {
        return this.service.send(user, recipientId, dto);
    }
    markRead(id, user) {
        return this.service.markRead(user, id);
    }
    delete(id, user) {
        return this.service.deleteMessage(user, id);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'My inbox' }),
    (0, common_1.Get)('messages/inbox'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/message.res.dto").MessageListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "inbox", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'My sent messages' }),
    (0, common_1.Get)('messages/sent'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/message.res.dto").MessageListResDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "sent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Unread count' }),
    (0, common_1.Get)('users/me/messages/unread-count'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "unreadCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mark all inbox as read' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Patch)('messages/read-all'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "markAllRead", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Send message to user' }),
    (0, common_1.Post)('messages/to/:recipientId'),
    openapi.ApiResponse({ status: 201, type: require("./dto/res/message.res.dto").MessageResDto }),
    __param(0, (0, common_1.Param)('recipientId', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, send_message_req_dto_1.SendMessageReqDto]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "send", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Mark message as read' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Patch)('messages/:id/read'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "markRead", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete message' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)('messages/:id'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "delete", null);
exports.MessageController = MessageController = __decorate([
    (0, swagger_1.ApiTags)('Messages'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map