"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ChangePasswordReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { oldPassword: { required: true, type: () => String }, newPassword: { required: true, type: () => String, minLength: 8, maxLength: 100, pattern: "/^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%_*#?&])[A-Za-z\\d@$_!%*#?&]{8,}$/" } };
    }
}
exports.ChangePasswordReqDto = ChangePasswordReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'OldPass123!' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordReqDto.prototype, "oldPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NewPass123!' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 100),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/, {
        message: 'Пароль: мін. 8 символів, літера + цифра + спецсимвол (@$!%_*#?&)',
    }),
    __metadata("design:type", String)
], ChangePasswordReqDto.prototype, "newPassword", void 0);
//# sourceMappingURL=change-password.req.dto.js.map