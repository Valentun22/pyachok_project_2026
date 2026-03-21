"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_comment_req_dto_1 = require("./base-comment.req.dto");
class CreateCommentReqDto extends (0, swagger_1.PickType)(base_comment_req_dto_1.BaseCommentReqDto, [
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
exports.CreateCommentReqDto = CreateCommentReqDto;
//# sourceMappingURL=create-comment.req.dto.js.map