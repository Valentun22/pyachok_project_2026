"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_user_res_dto_1 = require("./base-user.res.dto");
class UserResDto extends (0, swagger_1.PickType)(base_user_res_dto_1.BaseUserResDto, [
    'id',
    'name',
    'email',
    'image',
    'bio',
    'birthdate',
    'city',
    'gender',
    'instagram',
    'interests',
    'role',
    'isFollowed',
    'isCritic',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UserResDto = UserResDto;
//# sourceMappingURL=user.res.dto.js.map