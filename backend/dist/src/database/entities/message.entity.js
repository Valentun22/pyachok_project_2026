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
exports.MessageEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const table_name_enum_1 = require("./enums/table-name.enum");
const create_update_model_1 = require("./models/create-update.model");
const pyachok_entity_1 = require("./pyachok.entity");
const user_entity_1 = require("./user.entity");
let MessageEntity = class MessageEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { text: { required: true, type: () => String }, isRead: { required: true, type: () => Boolean }, sender_id: { required: true, type: () => String }, sender: { required: false, type: () => require("./user.entity").UserEntity }, recipient_id: { required: true, type: () => String }, recipient: { required: false, type: () => require("./user.entity").UserEntity }, pyachok_id: { required: false, type: () => String }, pyachok: { required: false, type: () => require("./pyachok.entity").PyachokEntity } };
    }
};
exports.MessageEntity = MessageEntity;
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], MessageEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MessageEntity.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MessageEntity.prototype, "sender_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'sender_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], MessageEntity.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MessageEntity.prototype, "recipient_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'recipient_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], MessageEntity.prototype, "recipient", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MessageEntity.prototype, "pyachok_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pyachok_entity_1.PyachokEntity, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'pyachok_id' }),
    __metadata("design:type", pyachok_entity_1.PyachokEntity)
], MessageEntity.prototype, "pyachok", void 0);
exports.MessageEntity = MessageEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.MESSAGES)
], MessageEntity);
//# sourceMappingURL=message.entity.js.map