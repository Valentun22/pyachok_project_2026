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
exports.PyachokEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const pyachok_status_enum_1 = require("../../modules/pyachok/enums/pyachok-status.enum");
const table_name_enum_1 = require("./enums/table-name.enum");
const create_update_model_1 = require("./models/create-update.model");
const user_entity_1 = require("./user.entity");
const venue_entity_1 = require("./venue.entity");
let PyachokEntity = class PyachokEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { date: { required: true, type: () => String }, time: { required: true, type: () => String }, purpose: { required: false, type: () => String }, peopleCount: { required: false, type: () => Number }, genderPreference: { required: false, type: () => String }, payer: { required: false, type: () => String }, expectedBudget: { required: false, type: () => Number }, status: { required: true, enum: require("../../modules/pyachok/enums/pyachok-status.enum").PyachokStatusEnum }, user_id: { required: true, type: () => String }, user: { required: true, type: () => require("./user.entity").UserEntity }, message: { required: false, type: () => String }, venue_id: { required: true, type: () => String }, venue: { required: true, type: () => require("./venue.entity").VenueEntity } };
    }
};
exports.PyachokEntity = PyachokEntity;
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", String)
], PyachokEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)('time'),
    __metadata("design:type", String)
], PyachokEntity.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], PyachokEntity.prototype, "purpose", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], PyachokEntity.prototype, "peopleCount", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], PyachokEntity.prototype, "genderPreference", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], PyachokEntity.prototype, "payer", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], PyachokEntity.prototype, "expectedBudget", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: pyachok_status_enum_1.PyachokStatusEnum,
        default: pyachok_status_enum_1.PyachokStatusEnum.OPEN,
    }),
    __metadata("design:type", String)
], PyachokEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], PyachokEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (entity) => entity.pyachok),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], PyachokEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], PyachokEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], PyachokEntity.prototype, "venue_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venue_entity_1.VenueEntity, (entity) => entity.pyachok),
    (0, typeorm_1.JoinColumn)({ name: 'venue_id' }),
    __metadata("design:type", venue_entity_1.VenueEntity)
], PyachokEntity.prototype, "venue", void 0);
exports.PyachokEntity = PyachokEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.PYACHOK_REQUESTS)
], PyachokEntity);
//# sourceMappingURL=pyachok.entity.js.map