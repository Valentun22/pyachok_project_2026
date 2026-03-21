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
exports.VenueEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const complaint_entity_1 = require("./complaint.entity");
const place_type_enum_1 = require("./enums/place-type.enum");
const table_name_enum_1 = require("./enums/table-name.enum");
const like_entity_1 = require("./like.entity");
const create_update_model_1 = require("./models/create-update.model");
const news_entity_1 = require("./news.entity");
const pyachok_entity_1 = require("./pyachok.entity");
const rating_venue_entity_1 = require("./rating-venue.entity");
const tag_entity_1 = require("./tag.entity");
const top_category_venue_entity_1 = require("./top-category-venue.entity");
const user_entity_1 = require("./user.entity");
let VenueEntity = class VenueEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, avatarVenue: { required: false, type: () => String }, logoVenue: { required: false, type: () => String }, image: { required: false, type: () => [String] }, menu: { required: false, type: () => String }, averageCheck: { required: false, type: () => Number }, workingHours: { required: false, type: () => ({ mon: { required: false, type: () => String }, tue: { required: false, type: () => String }, wed: { required: false, type: () => String }, thu: { required: false, type: () => String }, fri: { required: false, type: () => String }, sat: { required: false, type: () => String }, sun: { required: false, type: () => String } }) }, city: { required: false, type: () => String }, address: { required: false, type: () => String }, categories: { required: false, enum: require("./enums/place-type.enum").VenueCategoryEnum, isArray: true }, isModerated: { required: true, type: () => Boolean }, isActive: { required: true, type: () => Boolean }, phone: { required: false, type: () => String }, email: { required: false, type: () => String }, website: { required: false, type: () => String }, socials: { required: false, type: () => ({ instagram: { required: false, type: () => String }, facebook: { required: false, type: () => String }, telegram: { required: false, type: () => String } }) }, description: { required: false, type: () => String }, hasWiFi: { required: true, type: () => Boolean }, hasParking: { required: true, type: () => Boolean }, liveMusic: { required: true, type: () => Boolean }, petFriendly: { required: true, type: () => Boolean }, hasTerrace: { required: true, type: () => Boolean }, smokingAllowed: { required: true, type: () => Boolean }, cardPayment: { required: true, type: () => Boolean }, likes: { required: false, type: () => [require("./like.entity").LikeEntity] }, comments: { required: false, type: () => [require("./comment.entity").CommentEntity] }, news: { required: false, type: () => [require("./news.entity").NewsEntity] }, complaints: { required: false, type: () => [require("./complaint.entity").ComplaintEntity] }, rating: { required: false, type: () => [require("./rating-venue.entity").RatingVenueEntity] }, topItems: { required: false, type: () => [require("./top-category-venue.entity").TopCategoryVenueEntity] }, user_id: { required: true, type: () => String }, user: { required: false, type: () => require("./user.entity").UserEntity }, tags: { required: false, type: () => [require("./tag.entity").TagEntity] }, pyachok: { required: false, type: () => [require("./pyachok.entity").PyachokEntity] }, favoritedBy: { required: false, type: () => [require("./user.entity").UserEntity] } };
    }
};
exports.VenueEntity = VenueEntity;
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], VenueEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], VenueEntity.prototype, "avatarVenue", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], VenueEntity.prototype, "logoVenue", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], VenueEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], VenueEntity.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], VenueEntity.prototype, "averageCheck", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], VenueEntity.prototype, "workingHours", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], VenueEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], VenueEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: place_type_enum_1.VenueCategoryEnum,
        array: true,
        nullable: true,
    }),
    __metadata("design:type", Array)
], VenueEntity.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], VenueEntity.prototype, "isModerated", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], VenueEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], VenueEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], VenueEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], VenueEntity.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], VenueEntity.prototype, "socials", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], VenueEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], VenueEntity.prototype, "hasWiFi", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], VenueEntity.prototype, "hasParking", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], VenueEntity.prototype, "liveMusic", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], VenueEntity.prototype, "petFriendly", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], VenueEntity.prototype, "hasTerrace", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], VenueEntity.prototype, "smokingAllowed", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], VenueEntity.prototype, "cardPayment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.LikeEntity, (entity) => entity.venue),
    __metadata("design:type", Array)
], VenueEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, (entity) => entity.venue),
    __metadata("design:type", Array)
], VenueEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => news_entity_1.NewsEntity, (entity) => entity.venue),
    __metadata("design:type", Array)
], VenueEntity.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => complaint_entity_1.ComplaintEntity, (entity) => entity.venue),
    __metadata("design:type", Array)
], VenueEntity.prototype, "complaints", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rating_venue_entity_1.RatingVenueEntity, (entity) => entity.venue),
    __metadata("design:type", Array)
], VenueEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => top_category_venue_entity_1.TopCategoryVenueEntity, (entity) => entity.venue),
    __metadata("design:type", Array)
], VenueEntity.prototype, "topItems", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VenueEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (entity) => entity.venues),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], VenueEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.TagEntity, (entity) => entity.venues),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], VenueEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pyachok_entity_1.PyachokEntity, (entity) => entity.venue),
    __metadata("design:type", Array)
], VenueEntity.prototype, "pyachok", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, (user) => user.favoriteVenues),
    __metadata("design:type", Array)
], VenueEntity.prototype, "favoritedBy", void 0);
exports.VenueEntity = VenueEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.VENUES)
], VenueEntity);
//# sourceMappingURL=venue.entity.js.map