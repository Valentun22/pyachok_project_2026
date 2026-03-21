"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_auth_req_dto_1 = require("./base-auth.req.dto");
class SignInReqDto extends (0, swagger_1.PickType)(base_auth_req_dto_1.BaseAuthReqDto, [
    'email',
    'password',
    'deviceId',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.SignInReqDto = SignInReqDto;
//# sourceMappingURL=sign-in.req.dto.js.map