"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserListResDto = void 0;
const openapi = require("@nestjs/swagger");
class AdminUserListResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../users/dto/res/user.res.dto").UserResDto] }, total: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, offset: { required: true, type: () => Number } };
    }
}
exports.AdminUserListResDto = AdminUserListResDto;
//# sourceMappingURL=admin-user-list.res.dto.js.map