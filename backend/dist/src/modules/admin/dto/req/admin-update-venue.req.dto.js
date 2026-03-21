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
exports.AdminUpdateVenueReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const place_type_enum_1 = require("../../../../database/entities/enums/place-type.enum");
class WorkingHoursDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { mon: { required: false, type: () => String }, tue: { required: false, type: () => String }, wed: { required: false, type: () => String }, thu: { required: false, type: () => String }, fri: { required: false, type: () => String }, sat: { required: false, type: () => String }, sun: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00-22:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "mon", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00-22:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "tue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00-22:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "wed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00-22:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "thu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00-22:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "fri", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '10:00-23:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "sat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '10:00-23:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "sun", void 0);
class SocialsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { instagram: { required: false, type: () => String }, facebook: { required: false, type: () => String }, telegram: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://instagram.com/venue' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialsDto.prototype, "instagram", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://facebook.com/venue' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialsDto.prototype, "facebook", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://t.me/venue' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialsDto.prototype, "telegram", void 0);
class AdminUpdateVenueReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, avatarVenue: { required: false, type: () => String }, logoVenue: { required: false, type: () => String }, image: { required: false, type: () => [String] }, menu: { required: false, type: () => String }, averageCheck: { required: false, type: () => Number }, workingHours: { required: false, type: () => WorkingHoursDto }, city: { required: false, type: () => String }, address: { required: false, type: () => String }, categories: { required: false, enum: require("../../../../database/entities/enums/place-type.enum").VenueCategoryEnum, isArray: true }, isModerated: { required: false, type: () => Boolean }, isActive: { required: false, type: () => Boolean }, phone: { required: false, type: () => String }, email: { required: false, type: () => String }, website: { required: false, type: () => String }, socials: { required: false, type: () => SocialsDto }, description: { required: false, type: () => String }, hasWiFi: { required: false, type: () => Boolean }, hasParking: { required: false, type: () => Boolean }, liveMusic: { required: false, type: () => Boolean }, petFriendly: { required: false, type: () => Boolean }, hasTerrace: { required: false, type: () => Boolean }, smokingAllowed: { required: false, type: () => Boolean }, cardPayment: { required: false, type: () => Boolean }, tags: { required: false, type: () => [String] } };
    }
}
exports.AdminUpdateVenueReqDto = AdminUpdateVenueReqDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateVenueReqDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateVenueReqDto.prototype, "avatarVenue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateVenueReqDto.prototype, "logoVenue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AdminUpdateVenueReqDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateVenueReqDto.prototype, "menu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminUpdateVenueReqDto.prototype, "averageCheck", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: WorkingHoursDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WorkingHoursDto),
    __metadata("design:type", WorkingHoursDto)
], AdminUpdateVenueReqDto.prototype, "workingHours", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateVenueReqDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateVenueReqDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ isArray: true, enum: place_type_enum_1.VenueCategoryEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(place_type_enum_1.VenueCategoryEnum, { each: true }),
    __metadata("design:type", Array)
], AdminUpdateVenueReqDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUpdateVenueReqDto.prototype, "isModerated", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUpdateVenueReqDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateVenueReqDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateVenueReqDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateVenueReqDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: SocialsDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SocialsDto),
    __metadata("design:type", SocialsDto)
], AdminUpdateVenueReqDto.prototype, "socials", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateVenueReqDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUpdateVenueReqDto.prototype, "hasWiFi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUpdateVenueReqDto.prototype, "hasParking", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUpdateVenueReqDto.prototype, "liveMusic", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUpdateVenueReqDto.prototype, "petFriendly", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUpdateVenueReqDto.prototype, "hasTerrace", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUpdateVenueReqDto.prototype, "smokingAllowed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminUpdateVenueReqDto.prototype, "cardPayment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'Tag names' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AdminUpdateVenueReqDto.prototype, "tags", void 0);
//# sourceMappingURL=admin-update-venue.req.dto.js.map