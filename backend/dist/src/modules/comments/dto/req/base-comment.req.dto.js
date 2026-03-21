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
exports.BaseCommentReqDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_helper_1 = require("../../../../common/helpers/transform.helper");
const comment_recommendation_1 = require("../../../../database/entities/enums/comment-recommendation");
class BaseCommentReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { body: { required: true, type: () => String, minLength: 1, maxLength: 5000 }, title: { required: true, type: () => String, minLength: 1, maxLength: 150 }, image_check: { required: false, type: () => String, minLength: 0, maxLength: 3000 }, rating: { required: true, type: () => Number, minimum: 1, maximum: 5 }, recommendation: { required: false, enum: require("../../../../database/entities/enums/comment-recommendation").CommentRecommendationEnum } };
    }
}
exports.BaseCommentReqDto = BaseCommentReqDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 5000),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseCommentReqDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 150),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseCommentReqDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 3000),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseCommentReqDto.prototype, "image_check", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], BaseCommentReqDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(comment_recommendation_1.CommentRecommendationEnum),
    __metadata("design:type", String)
], BaseCommentReqDto.prototype, "recommendation", void 0);
//# sourceMappingURL=base-comment.req.dto.js.map