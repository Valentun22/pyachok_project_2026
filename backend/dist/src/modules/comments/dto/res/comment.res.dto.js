"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentResDto = void 0;
const openapi = require("@nestjs/swagger");
const base_comment_res_dto_1 = require("./base-comment.res.dto");
class CommentResDto extends base_comment_res_dto_1.BaseCommentResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { venueId: { required: true, type: () => String } };
    }
}
exports.CommentResDto = CommentResDto;
//# sourceMappingURL=comment.res.dto.js.map