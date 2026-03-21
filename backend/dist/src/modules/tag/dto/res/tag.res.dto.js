"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagResDto = void 0;
const openapi = require("@nestjs/swagger");
class TagResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, venueCount: { required: true, type: () => Number } };
    }
}
exports.TagResDto = TagResDto;
//# sourceMappingURL=tag.res.dto.js.map