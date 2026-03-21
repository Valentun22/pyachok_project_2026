"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_auth_req_dto_1 = require("./base-auth.req.dto");
class SignUpReqDto extends (0, swagger_1.PickType)(base_auth_req_dto_1.BaseAuthReqDto, [
    'email',
    'password',
    'bio',
    'name',
    'deviceId',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.SignUpReqDto = SignUpReqDto;
//# sourceMappingURL=sign-up.req.dto.js.map