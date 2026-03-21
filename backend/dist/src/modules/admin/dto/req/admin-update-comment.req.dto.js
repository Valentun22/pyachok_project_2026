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
exports.AdminUpdateCommentReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const comment_recommendation_1 = require("../../../../database/entities/enums/comment-recommendation");
class AdminUpdateCommentReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: false, type: () => String }, body: { required: false, type: () => String }, rating: { required: false, type: () => Number, minimum: 1, maximum: 10 }, recommendation: { required: false, nullable: true, enum: require("../../../../database/entities/enums/comment-recommendation").CommentRecommendationEnum }, image_check: { required: false, type: () => String, nullable: true } };
    }
}
exports.AdminUpdateCommentReqDto = AdminUpdateCommentReqDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateCommentReqDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateCommentReqDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 8, minimum: 1, maximum: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], AdminUpdateCommentReqDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: comment_recommendation_1.CommentRecommendationEnum,
        example: comment_recommendation_1.CommentRecommendationEnum.RECOMMEND,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(comment_recommendation_1.CommentRecommendationEnum),
    __metadata("design:type", String)
], AdminUpdateCommentReqDto.prototype, "recommendation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://...' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateCommentReqDto.prototype, "image_check", void 0);
//# sourceMappingURL=admin-update-comment.req.dto.js.map