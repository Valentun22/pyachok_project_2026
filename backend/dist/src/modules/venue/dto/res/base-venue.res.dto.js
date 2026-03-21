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
exports.BaseVenueResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const place_type_enum_1 = require("../../../../database/entities/enums/place-type.enum");
class WorkingHoursResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { mon: { required: false, type: () => String }, tue: { required: false, type: () => String }, wed: { required: false, type: () => String }, thu: { required: false, type: () => String }, fri: { required: false, type: () => String }, sat: { required: false, type: () => String }, sun: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00-22:00' }),
    __metadata("design:type", String)
], WorkingHoursResDto.prototype, "mon", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00-22:00' }),
    __metadata("design:type", String)
], WorkingHoursResDto.prototype, "tue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00-22:00' }),
    __metadata("design:type", String)
], WorkingHoursResDto.prototype, "wed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00-22:00' }),
    __metadata("design:type", String)
], WorkingHoursResDto.prototype, "thu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00-22:00' }),
    __metadata("design:type", String)
], WorkingHoursResDto.prototype, "fri", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '10:00-23:00' }),
    __metadata("design:type", String)
], WorkingHoursResDto.prototype, "sat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '10:00-23:00' }),
    __metadata("design:type", String)
], WorkingHoursResDto.prototype, "sun", void 0);
class SocialsResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { instagram: { required: false, type: () => String }, facebook: { required: false, type: () => String }, telegram: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://instagram.com/venue' }),
    __metadata("design:type", String)
], SocialsResDto.prototype, "instagram", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://facebook.com/venue' }),
    __metadata("design:type", String)
], SocialsResDto.prototype, "facebook", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://t.me/venue' }),
    __metadata("design:type", String)
], SocialsResDto.prototype, "telegram", void 0);
class BaseVenueResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date }, name: { required: true, type: () => String }, avatarVenue: { required: false, type: () => String }, logoVenue: { required: false, type: () => String }, image: { required: false, type: () => [String] }, menu: { required: false, type: () => String }, averageCheck: { required: false, type: () => Number }, workingHours: { required: false, type: () => WorkingHoursResDto }, city: { required: true, type: () => String }, address: { required: true, type: () => String }, categories: { required: false, enum: require("../../../../database/entities/enums/place-type.enum").VenueCategoryEnum, isArray: true }, isModerated: { required: true, type: () => Boolean }, isActive: { required: true, type: () => Boolean }, phone: { required: false, type: () => String }, email: { required: false, type: () => String }, website: { required: false, type: () => String }, socials: { required: false, type: () => SocialsResDto }, description: { required: true, type: () => String }, hasWiFi: { required: true, type: () => Boolean }, hasParking: { required: true, type: () => Boolean }, liveMusic: { required: true, type: () => Boolean }, petFriendly: { required: true, type: () => Boolean }, hasTerrace: { required: true, type: () => Boolean }, smokingAllowed: { required: true, type: () => Boolean }, cardPayment: { required: true, type: () => Boolean }, ratingAvg: { required: false, type: () => Number }, ratingCount: { required: false, type: () => Number }, tags: { required: false, type: () => [String] }, isLiked: { required: true, type: () => Boolean }, likesCount: { required: true, type: () => Number }, user: { required: false, type: () => require("../../../users/dto/res/user.res.dto").UserResDto }, isFavorite: { required: true, type: () => Boolean } };
    }
}
exports.BaseVenueResDto = BaseVenueResDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '796cea24-a328-4463-a5e1-85a779e4780f',
        description: 'Venue ID',
    }),
    __metadata("design:type", String)
], BaseVenueResDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2021-09-29T10:00:00.000Z',
        description: 'Venue Created Date',
    }),
    (0, class_transformer_1.Transform)(({ obj }) => obj.createdAt ?? obj.created),
    __metadata("design:type", Date)
], BaseVenueResDto.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2021-09-29T10:00:00.000Z',
        description: 'Venue Updated Date',
    }),
    (0, class_transformer_1.Transform)(({ obj }) => obj.updatedAt ?? obj.updated),
    __metadata("design:type", Date)
], BaseVenueResDto.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Venue Title', description: 'Venue Title' }),
    __metadata("design:type", String)
], BaseVenueResDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://cdn.site.com/venue/avatar.jpg',
        description: 'Venue avatar',
    }),
    __metadata("design:type", String)
], BaseVenueResDto.prototype, "avatarVenue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://cdn.site.com/venue/logo.png',
        description: 'Venue logo',
    }),
    __metadata("design:type", String)
], BaseVenueResDto.prototype, "logoVenue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: [
            'https://cdn.site.com/venue/1.jpg',
            'https://cdn.site.com/venue/2.jpg',
        ],
        description: 'Venue images',
    }),
    __metadata("design:type", Array)
], BaseVenueResDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://cdn.site.com/menu.pdf',
        description: 'Venue menu',
    }),
    __metadata("design:type", String)
], BaseVenueResDto.prototype, "menu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 150, description: 'Venue average check' }),
    __metadata("design:type", Number)
], BaseVenueResDto.prototype, "averageCheck", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Venue working hours' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WorkingHoursResDto),
    __metadata("design:type", WorkingHoursResDto)
], BaseVenueResDto.prototype, "workingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lviv', description: 'City' }),
    __metadata("design:type", String)
], BaseVenueResDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Korzo 10', description: 'Address' }),
    __metadata("design:type", String)
], BaseVenueResDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: [place_type_enum_1.VenueCategoryEnum.BAR],
        description: 'Venue categories',
        enum: place_type_enum_1.VenueCategoryEnum,
        isArray: true,
    }),
    __metadata("design:type", Array)
], BaseVenueResDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is moderated' }),
    __metadata("design:type", Boolean)
], BaseVenueResDto.prototype, "isModerated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is active' }),
    __metadata("design:type", Boolean)
], BaseVenueResDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+380501234567', description: 'Phone' }),
    __metadata("design:type", String)
], BaseVenueResDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'venue@gmail.com', description: 'Email' }),
    __metadata("design:type", String)
], BaseVenueResDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://venue.com',
        description: 'Website URL',
    }),
    __metadata("design:type", String)
], BaseVenueResDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Social networks' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SocialsResDto),
    __metadata("design:type", SocialsResDto)
], BaseVenueResDto.prototype, "socials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Venue Description',
        description: 'Venue Description',
    }),
    __metadata("design:type", String)
], BaseVenueResDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], BaseVenueResDto.prototype, "hasWiFi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], BaseVenueResDto.prototype, "hasParking", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], BaseVenueResDto.prototype, "liveMusic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], BaseVenueResDto.prototype, "petFriendly", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], BaseVenueResDto.prototype, "hasTerrace", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], BaseVenueResDto.prototype, "smokingAllowed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], BaseVenueResDto.prototype, "cardPayment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 8.6,
        description: 'Average venue rating (1..10)',
    }),
    __metadata("design:type", Number)
], BaseVenueResDto.prototype, "ratingAvg", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 124,
        description: 'How many ratings were left',
    }),
    __metadata("design:type", Number)
], BaseVenueResDto.prototype, "ratingCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: ['bar', 'pub'],
        description: 'Venue tags',
    }),
    (0, class_transformer_1.Transform)(({ obj }) => {
        const tags = obj?.tags;
        if (!Array.isArray(tags))
            return [];
        return tags.map((t) => t.name);
    }),
    __metadata("design:type", Array)
], BaseVenueResDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Is Venue Liked',
    }),
    __metadata("design:type", Boolean)
], BaseVenueResDto.prototype, "isLiked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], BaseVenueResDto.prototype, "likesCount", void 0);
//# sourceMappingURL=base-venue.res.dto.js.map