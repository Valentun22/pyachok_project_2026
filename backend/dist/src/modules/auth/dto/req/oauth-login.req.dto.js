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
exports.OAuthLoginReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const oauth_provider_enum_1 = require("../../../../database/entities/enums/oauth-provider.enum");
class OAuthLoginReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { provider: { required: true, enum: require("../../../../database/entities/enums/oauth-provider.enum").OAuthProviderEnum }, token: { required: true, type: () => String }, deviceId: { required: false, type: () => String } };
    }
}
exports.OAuthLoginReqDto = OAuthLoginReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: oauth_provider_enum_1.OAuthProviderEnum }),
    (0, class_validator_1.IsEnum)(oauth_provider_enum_1.OAuthProviderEnum),
    __metadata("design:type", String)
], OAuthLoginReqDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OAuthLoginReqDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OAuthLoginReqDto.prototype, "deviceId", void 0);
//# sourceMappingURL=oauth-login.req.dto.js.map