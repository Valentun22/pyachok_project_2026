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
exports.VenueListQueryDto = exports.SortOrderEnum = exports.VenueSortByEnum = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_helper_1 = require("../../../../common/helpers/transform.helper");
const place_type_enum_1 = require("../../../../database/entities/enums/place-type.enum");
var VenueSortByEnum;
(function (VenueSortByEnum) {
    VenueSortByEnum["RATING"] = "rating";
    VenueSortByEnum["AVERAGE_CHECK"] = "averageCheck";
    VenueSortByEnum["CREATED"] = "created";
    VenueSortByEnum["NAME"] = "name";
})(VenueSortByEnum || (exports.VenueSortByEnum = VenueSortByEnum = {}));
var SortOrderEnum;
(function (SortOrderEnum) {
    SortOrderEnum["ASC"] = "ASC";
    SortOrderEnum["DESC"] = "DESC";
})(SortOrderEnum || (exports.SortOrderEnum = SortOrderEnum = {}));
class VenueListQueryDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.sortBy = VenueSortByEnum.CREATED;
        this.sortOrder = SortOrderEnum.DESC;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: false, type: () => Number, default: 10, minimum: 1, maximum: 100 }, offset: { required: false, type: () => Number, default: 0, minimum: 0 }, tag: { required: false, type: () => String }, likes: { required: false, type: () => String }, search: { required: false, type: () => String }, averageCheckFrom: { required: false, type: () => Number }, averageCheckTo: { required: false, type: () => Number }, ratingFrom: { required: false, type: () => Number, minimum: 1, maximum: 10 }, ratingTo: { required: false, type: () => Number, minimum: 1, maximum: 10 }, categories: { required: false, enum: require("../../../../database/entities/enums/place-type.enum").VenueCategoryEnum, isArray: true }, hasWiFi: { required: false, type: () => Boolean }, hasParking: { required: false, type: () => Boolean }, liveMusic: { required: false, type: () => Boolean }, petFriendly: { required: false, type: () => Boolean }, hasTerrace: { required: false, type: () => Boolean }, smokingAllowed: { required: false, type: () => Boolean }, cardPayment: { required: false, type: () => Boolean }, sortBy: { required: false, default: VenueSortByEnum.CREATED, enum: require("./venue-list.query.dto").VenueSortByEnum }, sortOrder: { required: false, default: SortOrderEnum.DESC, enum: require("./venue-list.query.dto").SortOrderEnum }, city: { required: false, type: () => String }, ownerId: { required: false, type: () => String } };
    }
}
exports.VenueListQueryDto = VenueListQueryDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], VenueListQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], VenueListQueryDto.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VenueListQueryDto.prototype, "tag", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VenueListQueryDto.prototype, "likes", void 0);
__decorate([
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.toLowerCase),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VenueListQueryDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VenueListQueryDto.prototype, "averageCheckFrom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VenueListQueryDto.prototype, "averageCheckTo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], VenueListQueryDto.prototype, "ratingFrom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], VenueListQueryDto.prototype, "ratingTo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(place_type_enum_1.VenueCategoryEnum, { each: true }),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.toArray),
    __metadata("design:type", Array)
], VenueListQueryDto.prototype, "categories", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VenueListQueryDto.prototype, "hasWiFi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VenueListQueryDto.prototype, "hasParking", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VenueListQueryDto.prototype, "liveMusic", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VenueListQueryDto.prototype, "petFriendly", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VenueListQueryDto.prototype, "hasTerrace", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VenueListQueryDto.prototype, "smokingAllowed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VenueListQueryDto.prototype, "cardPayment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(VenueSortByEnum),
    __metadata("design:type", String)
], VenueListQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortOrderEnum),
    __metadata("design:type", String)
], VenueListQueryDto.prototype, "sortOrder", void 0);
__decorate([
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.trim),
    (0, class_transformer_1.Transform)(transform_helper_1.TransformHelper.toLowerCase),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VenueListQueryDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VenueListQueryDto.prototype, "ownerId", void 0);
//# sourceMappingURL=venue-list.query.dto.js.map