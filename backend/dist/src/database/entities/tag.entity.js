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
exports.TagEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const table_name_enum_1 = require("./enums/table-name.enum");
const create_update_model_1 = require("./models/create-update.model");
const venue_entity_1 = require("./venue.entity");
let TagEntity = class TagEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, venueCount: { required: false, type: () => Number }, venues: { required: false, type: () => [require("./venue.entity").VenueEntity] } };
    }
};
exports.TagEntity = TagEntity;
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], TagEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.VirtualColumn)({ query: () => 'NULL' }),
    __metadata("design:type", Number)
], TagEntity.prototype, "venueCount", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => venue_entity_1.VenueEntity, (entity) => entity.tags),
    __metadata("design:type", Array)
], TagEntity.prototype, "venues", void 0);
exports.TagEntity = TagEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.TAGS)
], TagEntity);
//# sourceMappingURL=tag.entity.js.map