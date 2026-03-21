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
exports.BaseVenueReqDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_helper_1 = require("../../../../common/helpers/transform.helper");
const place_type_enum_1 = require("../../../../database/entities/enums/place-type.enum");
class WorkingHoursDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { mon: { required: false, type: () => String }, tue: { required: false, type: () => String }, wed: { required: false, type: () => String }, thu: { required: false, type: () => String }, fri: { required: false, type: () => String }, sat: { required: false, type: () => String }, sun: { required: false, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "mon", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "tue", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "wed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "thu", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "fri", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkingHoursDto.prototype, "sat", void 0);
__decorate([
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
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialsDto.prototype, "instagram", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialsDto.prototype, "facebook", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialsDto.prototype, "telegram", void 0);
class BaseVenueReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 50 }, avatarVenue: { required: false, type: () => String, minLength: 0, maxLength: 3000 }, logoVenue: { required: false, type: () => String, minLength: 0, maxLength: 3000 }, image: { required: false, type: () => [String] }, menu: { required: false, type: () => String }, averageCheck: { required: false, type: () => Number }, workingHours: { required: false, type: () => WorkingHoursDto }, city: { required: true, type: () => String }, address: { required: true, type: () => String }, categories: { required: false, enum: require("../../../../database/entities/enums/place-type.enum").VenueCategoryEnum, isArray: true }, phone: { required: false, type: () => String, pattern: "/^\\+?[0-9]{10,15}$/" }, email: { required: false, type: () => String }, website: { required: false, type: () => String }, socials: { required: false, type: () => SocialsDto }, description: { required: true, type: () => String, minLength: 0, maxLength: 30000 }, hasWiFi: { required: false, type: () => Boolean }, hasParking: { required: false, type: () => Boolean }, liveMusic: { required: false, type: () => Boolean }, petFriendly: { required: false, type: () => Boolean }, hasTerrace: { required: false, type: () => Boolean }, smokingAllowed: { required: false, type: () => Boolean }, cardPayment: { required: false, type: () => Boolean }, tags: { required: false, type: () => [String], minLength: 3, maxLength: 30 }, isFavorite: { required: false, type: () => Boolean } };
    }
}
exports.BaseVenueReqDto = BaseVenueReqDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 50),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseVenueReqDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 3000),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseVenueReqDto.prototype, "avatarVenue", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 3000),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseVenueReqDto.prototype, "logoVenue", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trimArray),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], BaseVenueReqDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseVenueReqDto.prototype, "menu", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseVenueReqDto.prototype, "averageCheck", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WorkingHoursDto),
    __metadata("design:type", WorkingHoursDto)
], BaseVenueReqDto.prototype, "workingHours", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseVenueReqDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseVenueReqDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(place_type_enum_1.VenueCategoryEnum, { each: true }),
    __metadata("design:type", Array)
], BaseVenueReqDto.prototype, "categories", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\+?[0-9]{10,15}$/),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseVenueReqDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseVenueReqDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseVenueReqDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SocialsDto),
    __metadata("design:type", SocialsDto)
], BaseVenueReqDto.prototype, "socials", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 30000),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], BaseVenueReqDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseVenueReqDto.prototype, "hasWiFi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseVenueReqDto.prototype, "hasParking", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseVenueReqDto.prototype, "liveMusic", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseVenueReqDto.prototype, "petFriendly", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseVenueReqDto.prototype, "hasTerrace", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseVenueReqDto.prototype, "smokingAllowed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseVenueReqDto.prototype, "cardPayment", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.Length)(3, 30, { each: true }),
    (0, class_validator_1.ArrayMaxSize)(5),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trimArray),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.uniqueItems),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.toLowerCaseArray),
    __metadata("design:type", Array)
], BaseVenueReqDto.prototype, "tags", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseVenueReqDto.prototype, "isFavorite", void 0);
//# sourceMappingURL=base-venue.req.dto.js.map