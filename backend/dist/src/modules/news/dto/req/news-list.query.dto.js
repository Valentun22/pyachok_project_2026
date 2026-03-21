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
exports.NewsListQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const news_type_enum_1 = require("../../../../database/entities/enums/news-type.enum");
class NewsListQueryDto {
    constructor() {
        this.offset = 0;
        this.limit = 10;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: false, enum: require("../../../../database/entities/enums/news-type.enum").NewsTypeEnum }, offset: { required: false, type: () => Number, default: 0, minimum: 0 }, limit: { required: false, type: () => Number, default: 10, minimum: 1, maximum: 100 } };
    }
}
exports.NewsListQueryDto = NewsListQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(news_type_enum_1.NewsTypeEnum),
    __metadata("design:type", String)
], NewsListQueryDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], NewsListQueryDto.prototype, "offset", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], NewsListQueryDto.prototype, "limit", void 0);
//# sourceMappingURL=news-list.query.dto.js.map