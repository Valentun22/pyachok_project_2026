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
exports.CreatePyachokReqDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const pyachok_gender_enum_1 = require("../../enums/pyachok-gender.enum");
const pyachok_payer_enum_1 = require("../../enums/pyachok-payer.enum");
function IsNotPastDate(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isNotPastDate',
            target: object.constructor,
            propertyName,
            options: {
                message: 'Дата не може бути в минулому',
                ...validationOptions,
            },
            validator: {
                validate(value) {
                    if (!value)
                        return true;
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return new Date(value) >= today;
                },
            },
        });
    };
}
class CreatePyachokReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { date: { required: true, type: () => String }, time: { required: true, type: () => String }, purpose: { required: false, type: () => String }, peopleCount: { required: false, type: () => Number, minimum: 1, maximum: 50 }, genderPreference: { required: false, enum: require("../../enums/pyachok-gender.enum").PyachokGenderEnum }, payer: { required: false, enum: require("../../enums/pyachok-payer.enum").PyachokPayerEnum }, message: { required: false, type: () => String }, expectedBudget: { required: false, type: () => Number, minimum: 0 } };
    }
}
exports.CreatePyachokReqDto = CreatePyachokReqDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    IsNotPastDate(),
    __metadata("design:type", String)
], CreatePyachokReqDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePyachokReqDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePyachokReqDto.prototype, "purpose", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], CreatePyachokReqDto.prototype, "peopleCount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(pyachok_gender_enum_1.PyachokGenderEnum),
    __metadata("design:type", String)
], CreatePyachokReqDto.prototype, "genderPreference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(pyachok_payer_enum_1.PyachokPayerEnum),
    __metadata("design:type", String)
], CreatePyachokReqDto.prototype, "payer", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePyachokReqDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePyachokReqDto.prototype, "expectedBudget", void 0);
//# sourceMappingURL=create-pyachok.req.dto.js.map