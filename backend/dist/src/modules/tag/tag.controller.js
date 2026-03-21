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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const skip_auth_decorator_1 = require("../auth/decorators/skip-auth.decorator");
const tag_mapper_1 = require("./services/tag.mapper");
const tag_service_1 = require("./services/tag.service");
let TagController = class TagController {
    constructor(service) {
        this.service = service;
    }
    async getPopular() {
        const result = await this.service.getPopular();
        return tag_mapper_1.TagMapper.toResponseListDTO(result);
    }
};
exports.TagController = TagController;
__decorate([
    (0, skip_auth_decorator_1.SkipAuth)(),
    (0, common_1.Get)('popular'),
    openapi.ApiResponse({ status: 200, type: [require("./dto/res/tag.res.dto").TagResDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getPopular", null);
exports.TagController = TagController = __decorate([
    (0, swagger_1.ApiTags)('Tag'),
    (0, common_1.Controller)('tags'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
//# sourceMappingURL=tag.controller.js.map