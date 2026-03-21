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
exports.TopCategoryEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const table_name_enum_1 = require("./enums/table-name.enum");
const create_update_model_1 = require("./models/create-update.model");
const top_category_venue_entity_1 = require("./top-category-venue.entity");
let TopCategoryEntity = class TopCategoryEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, slug: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, order: { required: true, type: () => Number }, items: { required: false, type: () => [require("./top-category-venue.entity").TopCategoryVenueEntity] } };
    }
};
exports.TopCategoryEntity = TopCategoryEntity;
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], TopCategoryEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Index)('IDX_top_categories_slug'),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], TopCategoryEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], TopCategoryEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Index)('IDX_top_categories_order'),
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], TopCategoryEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => top_category_venue_entity_1.TopCategoryVenueEntity, (it) => it.category),
    __metadata("design:type", Array)
], TopCategoryEntity.prototype, "items", void 0);
exports.TopCategoryEntity = TopCategoryEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.TOP_CATEGORIES),
    (0, typeorm_1.Unique)('UQ_top_categories_slug', ['slug'])
], TopCategoryEntity);
//# sourceMappingURL=top-category.entity.js.map