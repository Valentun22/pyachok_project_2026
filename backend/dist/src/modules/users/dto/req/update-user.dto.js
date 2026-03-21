"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_user_req_dto_1 = require("./base-user.req.dto");
class UpdateUserDto extends (0, swagger_1.PickType)(base_user_req_dto_1.BaseUserReqDto, [
    'bio',
    'name',
    'image',
    'birthdate',
    'city',
    'gender',
    'instagram',
    'interests',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map