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
exports.ComplaintResDto = exports.ComplaintVenuePreviewDto = exports.ComplaintUserPreviewDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const complaint_status_enum_1 = require("../../../../database/entities/enums/complaint-status.enum");
const complaint_type_enum_1 = require("../../../../database/entities/enums/complaint-type.enum");
class ComplaintUserPreviewDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, image: { required: false, type: () => String } };
    }
}
exports.ComplaintUserPreviewDto = ComplaintUserPreviewDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ComplaintUserPreviewDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ComplaintUserPreviewDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ComplaintUserPreviewDto.prototype, "image", void 0);
class ComplaintVenuePreviewDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.ComplaintVenuePreviewDto = ComplaintVenuePreviewDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ComplaintVenuePreviewDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ComplaintVenuePreviewDto.prototype, "name", void 0);
class ComplaintResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, venueId: { required: true, type: () => String }, userId: { required: true, type: () => String }, type: { required: true, enum: require("../../../../database/entities/enums/complaint-type.enum").ComplaintTypeEnum }, targetId: { required: false, type: () => String }, reason: { required: true, type: () => String }, status: { required: true, enum: require("../../../../database/entities/enums/complaint-status.enum").ComplaintStatusEnum }, created: { required: true, type: () => Date }, user: { required: false, type: () => require("./complaint.res.dto").ComplaintUserPreviewDto }, venue: { required: false, type: () => require("./complaint.res.dto").ComplaintVenuePreviewDto } };
    }
}
exports.ComplaintResDto = ComplaintResDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ComplaintResDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ComplaintResDto.prototype, "venueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ComplaintResDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: complaint_type_enum_1.ComplaintTypeEnum }),
    __metadata("design:type", String)
], ComplaintResDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ComplaintResDto.prototype, "targetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ComplaintResDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: complaint_status_enum_1.ComplaintStatusEnum }),
    __metadata("design:type", String)
], ComplaintResDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ComplaintResDto.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: ComplaintUserPreviewDto }),
    __metadata("design:type", ComplaintUserPreviewDto)
], ComplaintResDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: ComplaintVenuePreviewDto }),
    __metadata("design:type", ComplaintVenuePreviewDto)
], ComplaintResDto.prototype, "venue", void 0);
//# sourceMappingURL=complaint.res.dto.js.map