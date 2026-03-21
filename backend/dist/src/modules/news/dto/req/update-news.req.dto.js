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
exports.UpdateNewsReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const news_type_enum_1 = require("../../../../database/entities/enums/news-type.enum");
class UpdateNewsReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: false, type: () => String, minLength: 1, maxLength: 200 }, body: { required: false, type: () => String, minLength: 1, maxLength: 5000 }, type: { required: false, enum: require("../../../../database/entities/enums/news-type.enum").NewsTypeEnum }, avatarNews: { required: false, type: () => String }, images: { required: false, type: () => [String] }, isActive: { required: false, type: () => Boolean } };
    }
}
exports.UpdateNewsReqDto = UpdateNewsReqDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated title' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 200),
    __metadata("design:type", String)
], UpdateNewsReqDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated body' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 5000),
    __metadata("design:type", String)
], UpdateNewsReqDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: news_type_enum_1.NewsTypeEnum,
        description: 'general | promotion | event',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(news_type_enum_1.NewsTypeEnum),
    __metadata("design:type", String)
], UpdateNewsReqDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://...jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateNewsReqDto.prototype, "avatarNews", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateNewsReqDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateNewsReqDto.prototype, "isActive", void 0);
//# sourceMappingURL=update-news.req.dto.js.map