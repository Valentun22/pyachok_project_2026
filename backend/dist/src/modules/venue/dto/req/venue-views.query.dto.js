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
exports.VenueViewsQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class VenueViewsQueryDto {
    constructor() {
        this.bucket = 'day';
    }
    get fromDate() {
        return this.from ? new Date(this.from) : undefined;
    }
    get toDate() {
        return this.to ? new Date(this.to) : undefined;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { from: { required: false, type: () => String }, to: { required: false, type: () => String }, bucket: { required: false, type: () => Object, default: "day", enum: ['day', 'hour'] } };
    }
}
exports.VenueViewsQueryDto = VenueViewsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-02-01T00:00:00.000Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VenueViewsQueryDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-02-20T23:59:59.000Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VenueViewsQueryDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'day', enum: ['day', 'hour'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['day', 'hour']),
    __metadata("design:type", String)
], VenueViewsQueryDto.prototype, "bucket", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => (obj.from ? new Date(obj.from) : undefined)),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [])
], VenueViewsQueryDto.prototype, "fromDate", null);
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => (obj.to ? new Date(obj.to) : undefined)),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [])
], VenueViewsQueryDto.prototype, "toDate", null);
//# sourceMappingURL=venue-views.query.dto.js.map