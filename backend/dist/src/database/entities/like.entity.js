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
exports.LikeEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const table_name_enum_1 = require("./enums/table-name.enum");
const create_update_model_1 = require("./models/create-update.model");
const user_entity_1 = require("./user.entity");
const venue_entity_1 = require("./venue.entity");
let LikeEntity = class LikeEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { user_id: { required: true, type: () => String }, user: { required: false, type: () => require("./user.entity").UserEntity }, venue_id: { required: true, type: () => String }, venue: { required: false, type: () => require("./venue.entity").VenueEntity } };
    }
};
exports.LikeEntity = LikeEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LikeEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (entity) => entity.likes),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], LikeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LikeEntity.prototype, "venue_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venue_entity_1.VenueEntity, (entity) => entity.likes),
    (0, typeorm_1.JoinColumn)({ name: 'venue_id' }),
    __metadata("design:type", venue_entity_1.VenueEntity)
], LikeEntity.prototype, "venue", void 0);
exports.LikeEntity = LikeEntity = __decorate([
    (0, typeorm_1.Unique)(['user_id', 'venue_id']),
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.LIKES)
], LikeEntity);
//# sourceMappingURL=like.entity.js.map