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
exports.TopCategoryVenueEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const table_name_enum_1 = require("./enums/table-name.enum");
const create_update_model_1 = require("./models/create-update.model");
const top_category_entity_1 = require("./top-category.entity");
const venue_entity_1 = require("./venue.entity");
let TopCategoryVenueEntity = class TopCategoryVenueEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { category_id: { required: true, type: () => String }, venue_id: { required: true, type: () => String }, order: { required: true, type: () => Number }, category: { required: false, type: () => require("./top-category.entity").TopCategoryEntity }, venue: { required: false, type: () => require("./venue.entity").VenueEntity } };
    }
};
exports.TopCategoryVenueEntity = TopCategoryVenueEntity;
__decorate([
    (0, typeorm_1.Index)('IDX_top_category_venues_category_id'),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], TopCategoryVenueEntity.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Index)('IDX_top_category_venues_venue_id'),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], TopCategoryVenueEntity.prototype, "venue_id", void 0);
__decorate([
    (0, typeorm_1.Index)('IDX_top_category_venues_order'),
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], TopCategoryVenueEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => top_category_entity_1.TopCategoryEntity, (c) => c.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", top_category_entity_1.TopCategoryEntity)
], TopCategoryVenueEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venue_entity_1.VenueEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'venue_id' }),
    __metadata("design:type", venue_entity_1.VenueEntity)
], TopCategoryVenueEntity.prototype, "venue", void 0);
exports.TopCategoryVenueEntity = TopCategoryVenueEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.TOP_CATEGORY_VENUES),
    (0, typeorm_1.Unique)('UQ_top_category_venue', ['category_id', 'venue_id'])
], TopCategoryVenueEntity);
//# sourceMappingURL=top-category-venue.entity.js.map