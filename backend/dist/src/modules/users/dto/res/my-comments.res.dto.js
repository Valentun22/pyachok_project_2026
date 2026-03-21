"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyCommentsResDto = void 0;
const openapi = require("@nestjs/swagger");
class MyCommentsResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../comments/dto/res/base-comment.res.dto").BaseCommentResDto] }, total: { required: true, type: () => Number }, page: { required: true, type: () => Number }, limit: { required: true, type: () => Number } };
    }
}
exports.MyCommentsResDto = MyCommentsResDto;
//# sourceMappingURL=my-comments.res.dto.js.map