"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentListResDto = void 0;
const openapi = require("@nestjs/swagger");
class CommentListResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("./comment-list-item.res.dto").CommentListItemResDto] }, total: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, offset: { required: true, type: () => Number } };
    }
}
exports.CommentListResDto = CommentListResDto;
//# sourceMappingURL=comment-list.res.dto.js.map