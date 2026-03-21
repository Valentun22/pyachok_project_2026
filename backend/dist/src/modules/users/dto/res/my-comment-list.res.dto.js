"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyCommentListResDto = void 0;
const openapi = require("@nestjs/swagger");
class MyCommentListResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../comments/dto/res/comment.res.dto").CommentResDto] }, total: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, offset: { required: true, type: () => Number } };
    }
}
exports.MyCommentListResDto = MyCommentListResDto;
//# sourceMappingURL=my-comment-list.res.dto.js.map