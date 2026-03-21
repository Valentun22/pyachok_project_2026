"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResDto = void 0;
const openapi = require("@nestjs/swagger");
class AuthResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { tokens: { required: true, type: () => require("./token-pair.res.dto").TokenPairResDto }, user: { required: true, type: () => require("../../../users/dto/res/user.res.dto").UserResDto } };
    }
}
exports.AuthResDto = AuthResDto;
//# sourceMappingURL=auth.res.dto.js.map