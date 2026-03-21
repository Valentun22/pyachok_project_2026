"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommentReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_comment_req_dto_1 = require("./base-comment.req.dto");
class UpdateCommentReqDto extends (0, swagger_1.PickType)(base_comment_req_dto_1.BaseCommentReqDto, [
    'body',
    'title',
    'image_check',
    'rating',
    'recommendation',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCommentReqDto = UpdateCommentReqDto;
//# sourceMappingURL=update-comment.req.dto.js.map