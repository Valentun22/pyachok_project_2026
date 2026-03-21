"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommentResDto = void 0;
const openapi = require("@nestjs/swagger");
class BaseCommentResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, body: { required: true, type: () => String }, image_check: { required: false, type: () => String, nullable: true }, rating: { required: true, type: () => Number }, recommendation: { required: false, nullable: true, enum: require("../../../../database/entities/enums/comment-recommendation").CommentRecommendationEnum }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date }, user: { required: true, type: () => require("../../../users/dto/res/user.res.dto").UserResDto }, isCritic: { required: true, type: () => Boolean }, isOwner: { required: true, type: () => Boolean } };
    }
}
exports.BaseCommentResDto = BaseCommentResDto;
//# sourceMappingURL=base-comment.res.dto.js.map