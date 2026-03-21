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
exports.CreateNewsReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const news_type_enum_1 = require("../../../../database/entities/enums/news-type.enum");
class CreateNewsReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String, minLength: 1, maxLength: 200 }, body: { required: true, type: () => String, minLength: 1, maxLength: 5000 }, type: { required: false, enum: require("../../../../database/entities/enums/news-type.enum").NewsTypeEnum }, avatarNews: { required: false, type: () => String }, images: { required: false, type: () => [String] } };
    }
}
exports.CreateNewsReqDto = CreateNewsReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New cocktail promotion' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 200),
    __metadata("design:type", String)
], CreateNewsReqDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Description of the promotion/event/news...' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 5000),
    __metadata("design:type", String)
], CreateNewsReqDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: news_type_enum_1.NewsTypeEnum,
        default: news_type_enum_1.NewsTypeEnum.GENERAL,
        description: 'general | promotion | event',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(news_type_enum_1.NewsTypeEnum),
    __metadata("design:type", String)
], CreateNewsReqDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://....jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNewsReqDto.prototype, "avatarNews", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        example: ['https://...1.jpg', 'https://...2.jpg'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateNewsReqDto.prototype, "images", void 0);
//# sourceMappingURL=create-news.req.dto.js.map