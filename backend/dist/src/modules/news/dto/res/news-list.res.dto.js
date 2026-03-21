"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsListResDto = void 0;
const openapi = require("@nestjs/swagger");
class NewsListResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("./news-list-item.res.dto").NewsListItemResDto] }, total: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, offset: { required: true, type: () => Number } };
    }
}
exports.NewsListResDto = NewsListResDto;
//# sourceMappingURL=news-list.res.dto.js.map