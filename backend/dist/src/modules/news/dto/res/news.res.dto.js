"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsResDto = void 0;
const openapi = require("@nestjs/swagger");
class NewsResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, body: { required: true, type: () => String }, type: { required: true, enum: require("../../../../database/entities/enums/news-type.enum").NewsTypeEnum }, isActive: { required: true, type: () => Boolean }, isPaid: { required: true, type: () => Boolean }, avatarNews: { required: false, type: () => String, nullable: true }, images: { required: false, type: () => [String], nullable: true }, venueId: { required: true, type: () => String }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date } };
    }
}
exports.NewsResDto = NewsResDto;
//# sourceMappingURL=news.res.dto.js.map