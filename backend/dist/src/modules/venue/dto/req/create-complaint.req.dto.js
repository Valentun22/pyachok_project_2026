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
exports.CreateComplaintReqDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const complaint_type_enum_1 = require("../../../../database/entities/enums/complaint-type.enum");
class CreateComplaintReqDto {
    constructor() {
        this.type = complaint_type_enum_1.ComplaintTypeEnum.VENUE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: false, default: complaint_type_enum_1.ComplaintTypeEnum.VENUE, enum: require("../../../../database/entities/enums/complaint-type.enum").ComplaintTypeEnum }, targetId: { required: false, type: () => String }, reason: { required: true, type: () => String, minLength: 5, maxLength: 2000 } };
    }
}
exports.CreateComplaintReqDto = CreateComplaintReqDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(complaint_type_enum_1.ComplaintTypeEnum),
    __metadata("design:type", String)
], CreateComplaintReqDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateComplaintReqDto.prototype, "targetId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(2000),
    __metadata("design:type", String)
], CreateComplaintReqDto.prototype, "reason", void 0);
//# sourceMappingURL=create-complaint.req.dto.js.map