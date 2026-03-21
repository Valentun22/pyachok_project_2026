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
exports.NewsEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const news_type_enum_1 = require("./enums/news-type.enum");
const table_name_enum_1 = require("./enums/table-name.enum");
const create_update_model_1 = require("./models/create-update.model");
const venue_entity_1 = require("./venue.entity");
let NewsEntity = class NewsEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { body: { required: true, type: () => String }, title: { required: true, type: () => String }, type: { required: true, enum: require("./enums/news-type.enum").NewsTypeEnum }, isActive: { required: true, type: () => Boolean }, isPaid: { required: true, type: () => Boolean }, avatarNews: { required: false, type: () => String }, images: { required: false, type: () => [String] }, venue_id: { required: true, type: () => String }, venue: { required: false, type: () => require("./venue.entity").VenueEntity } };
    }
};
exports.NewsEntity = NewsEntity;
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], NewsEntity.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], NewsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: news_type_enum_1.NewsTypeEnum,
    }),
    __metadata("design:type", String)
], NewsEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], NewsEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], NewsEntity.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], NewsEntity.prototype, "avatarNews", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], NewsEntity.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewsEntity.prototype, "venue_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venue_entity_1.VenueEntity, (entity) => entity.news),
    (0, typeorm_1.JoinColumn)({ name: 'venue_id' }),
    __metadata("design:type", venue_entity_1.VenueEntity)
], NewsEntity.prototype, "venue", void 0);
exports.NewsEntity = NewsEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.NEWS)
], NewsEntity);
//# sourceMappingURL=news.entity.js.map