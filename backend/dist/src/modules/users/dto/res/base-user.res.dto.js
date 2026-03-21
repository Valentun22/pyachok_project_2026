"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUserResDto = void 0;
const openapi = require("@nestjs/swagger");
class BaseUserResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, bio: { required: false, type: () => String }, image: { required: false, type: () => String }, birthdate: { required: false, type: () => String }, city: { required: false, type: () => String }, gender: { required: false, type: () => String }, instagram: { required: false, type: () => String }, interests: { required: false, type: () => String }, role: { required: false, type: () => [String] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, isFollowed: { required: true, type: () => Boolean }, isCritic: { required: true, type: () => Boolean } };
    }
}
exports.BaseUserResDto = BaseUserResDto;
//# sourceMappingURL=base-user.res.dto.js.map