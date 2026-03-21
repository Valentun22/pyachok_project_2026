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
exports.ComplaintEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const complaint_status_enum_1 = require("./enums/complaint-status.enum");
const complaint_type_enum_1 = require("./enums/complaint-type.enum");
const table_name_enum_1 = require("./enums/table-name.enum");
const create_update_model_1 = require("./models/create-update.model");
const user_entity_1 = require("./user.entity");
const venue_entity_1 = require("./venue.entity");
let ComplaintEntity = class ComplaintEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { venue_id: { required: true, type: () => String }, venue: { required: false, type: () => require("./venue.entity").VenueEntity }, user_id: { required: true, type: () => String }, user: { required: false, type: () => require("./user.entity").UserEntity }, type: { required: true, enum: require("./enums/complaint-type.enum").ComplaintTypeEnum }, targetId: { required: false, type: () => String }, reason: { required: true, type: () => String }, status: { required: true, enum: require("./enums/complaint-status.enum").ComplaintStatusEnum } };
    }
};
exports.ComplaintEntity = ComplaintEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], ComplaintEntity.prototype, "venue_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venue_entity_1.VenueEntity, (entity) => entity.complaints, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'venue_id' }),
    __metadata("design:type", venue_entity_1.VenueEntity)
], ComplaintEntity.prototype, "venue", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], ComplaintEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (entity) => entity.complaints, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ComplaintEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: complaint_type_enum_1.ComplaintTypeEnum,
        default: complaint_type_enum_1.ComplaintTypeEnum.VENUE,
    }),
    __metadata("design:type", String)
], ComplaintEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ComplaintEntity.prototype, "targetId", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ComplaintEntity.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: complaint_status_enum_1.ComplaintStatusEnum,
        default: complaint_status_enum_1.ComplaintStatusEnum.NEW,
    }),
    __metadata("design:type", String)
], ComplaintEntity.prototype, "status", void 0);
exports.ComplaintEntity = ComplaintEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.COMPLAINTS)
], ComplaintEntity);
//# sourceMappingURL=complaint.entity.js.map