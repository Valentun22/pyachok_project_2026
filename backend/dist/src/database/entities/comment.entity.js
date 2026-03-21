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
exports.CommentEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const comment_recommendation_1 = require("./enums/comment-recommendation");
const table_name_enum_1 = require("./enums/table-name.enum");
const create_update_model_1 = require("./models/create-update.model");
const user_entity_1 = require("./user.entity");
const venue_entity_1 = require("./venue.entity");
let CommentEntity = class CommentEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { body: { required: true, type: () => String }, title: { required: true, type: () => String }, image_check: { required: false, type: () => String }, rating: { required: true, type: () => Number }, recommendation: { required: false, nullable: true, enum: require("./enums/comment-recommendation").CommentRecommendationEnum }, user_id: { required: true, type: () => String }, user: { required: false, type: () => require("./user.entity").UserEntity }, venue_id: { required: true, type: () => String }, venue: { required: false, type: () => require("./venue.entity").VenueEntity } };
    }
};
exports.CommentEntity = CommentEntity;
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], CommentEntity.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], CommentEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], CommentEntity.prototype, "image_check", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], CommentEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: comment_recommendation_1.CommentRecommendationEnum,
        nullable: true,
    }),
    __metadata("design:type", String)
], CommentEntity.prototype, "recommendation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommentEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (entity) => entity.comments),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], CommentEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommentEntity.prototype, "venue_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venue_entity_1.VenueEntity, (entity) => entity.comments),
    (0, typeorm_1.JoinColumn)({ name: 'venue_id' }),
    __metadata("design:type", venue_entity_1.VenueEntity)
], CommentEntity.prototype, "venue", void 0);
exports.CommentEntity = CommentEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.COMMENTS)
], CommentEntity);
//# sourceMappingURL=comment.entity.js.map