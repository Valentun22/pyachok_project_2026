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
exports.ComplaintListQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const complaint_status_enum_1 = require("../../../../database/entities/enums/complaint-status.enum");
const complaint_type_enum_1 = require("../../../../database/entities/enums/complaint-type.enum");
class ComplaintListQueryDto {
    constructor() {
        this.limit = 10;
        this.offset = 0;
    }
    get fromDate() {
        if (!this.from)
            return undefined;
        const d = new Date(this.from);
        return Number.isNaN(d.getTime()) ? undefined : d;
    }
    get toDate() {
        if (!this.to)
            return undefined;
        const d = new Date(this.to);
        return Number.isNaN(d.getTime()) ? undefined : d;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: false, type: () => Number, default: 10, minimum: 1, maximum: 100 }, offset: { required: false, type: () => Number, default: 0, minimum: 0 }, status: { required: false, enum: require("../../../../database/entities/enums/complaint-status.enum").ComplaintStatusEnum }, type: { required: false, enum: require("../../../../database/entities/enums/complaint-type.enum").ComplaintTypeEnum }, from: { required: false, type: () => String }, to: { required: false, type: () => String } };
    }
}
exports.ComplaintListQueryDto = ComplaintListQueryDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ComplaintListQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ComplaintListQueryDto.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(complaint_status_enum_1.ComplaintStatusEnum),
    __metadata("design:type", String)
], ComplaintListQueryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(complaint_type_enum_1.ComplaintTypeEnum),
    __metadata("design:type", String)
], ComplaintListQueryDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComplaintListQueryDto.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComplaintListQueryDto.prototype, "to", void 0);
//# sourceMappingURL=complaint-list.query.dto.js.map