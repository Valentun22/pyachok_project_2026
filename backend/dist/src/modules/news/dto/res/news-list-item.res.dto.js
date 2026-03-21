"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsListItemResDto = void 0;
const openapi = require("@nestjs/swagger");
class NewsListItemResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, body: { required: true, type: () => String }, type: { required: true, enum: require("../../../../database/entities/enums/news-type.enum").NewsTypeEnum }, isActive: { required: true, type: () => Boolean }, isPaid: { required: true, type: () => Boolean }, avatarNews: { required: false, type: () => String, nullable: true }, images: { required: false, type: () => [String], nullable: true }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date }, venue: { required: true, type: () => ({ id: { required: true, type: () => String }, name: { required: true, type: () => String }, avatarVenue: { required: false, type: () => String, nullable: true }, logoVenue: { required: false, type: () => String, nullable: true } }) } };
    }
}
exports.NewsListItemResDto = NewsListItemResDto;
//# sourceMappingURL=news-list-item.res.dto.js.map