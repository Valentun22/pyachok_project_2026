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
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const complaint_entity_1 = require("./complaint.entity");
const oauth_provider_enum_1 = require("./enums/oauth-provider.enum");
const role_enum_1 = require("./enums/role.enum");
const table_name_enum_1 = require("./enums/table-name.enum");
const follow_entity_1 = require("./follow.entity");
const like_entity_1 = require("./like.entity");
const create_update_model_1 = require("./models/create-update.model");
const pyachok_entity_1 = require("./pyachok.entity");
const rating_venue_entity_1 = require("./rating-venue.entity");
const refresh_token_entity_1 = require("./refresh-token.entity");
const venue_entity_1 = require("./venue.entity");
let UserEntity = class UserEntity extends create_update_model_1.CreateUpdateModel {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: false, type: () => String }, bio: { required: false, type: () => String }, image: { required: false, type: () => String }, birthdate: { required: false, type: () => String }, city: { required: false, type: () => String }, gender: { required: false, type: () => String }, instagram: { required: false, type: () => String }, interests: { required: false, type: () => String }, role: { required: true, enum: require("./enums/role.enum").RoleUserEnum, isArray: true }, oauthProvider: { required: false, enum: require("./enums/oauth-provider.enum").OAuthProviderEnum }, oauthId: { required: false, type: () => String }, isEmailVerified: { required: true, type: () => Boolean }, emailVerifyToken: { required: false, type: () => String }, likes: { required: false, type: () => [require("./like.entity").LikeEntity] }, complaints: { required: false, type: () => [require("./complaint.entity").ComplaintEntity] }, comments: { required: false, type: () => [require("./comment.entity").CommentEntity] }, venues: { required: false, type: () => [require("./venue.entity").VenueEntity] }, refreshTokens: { required: false, type: () => [require("./refresh-token.entity").RefreshTokenEntity] }, followers: { required: false, type: () => [require("./follow.entity").FollowEntity] }, followings: { required: false, type: () => [require("./follow.entity").FollowEntity] }, rating: { required: false, type: () => [require("./rating-venue.entity").RatingVenueEntity] }, pyachok: { required: false, type: () => [require("./pyachok.entity").PyachokEntity] }, favoriteVenues: { required: false, type: () => [require("./venue.entity").VenueEntity] } };
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true, select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "instagram", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "interests", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: role_enum_1.RoleUserEnum,
        array: true,
        default: [role_enum_1.RoleUserEnum.USER],
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: oauth_provider_enum_1.OAuthProviderEnum,
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "oauthProvider", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "oauthId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true, select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "emailVerifyToken", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.LikeEntity, (entity) => entity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => complaint_entity_1.ComplaintEntity, (entity) => entity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "complaints", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, (entity) => entity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => venue_entity_1.VenueEntity, (entity) => entity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "venues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => refresh_token_entity_1.RefreshTokenEntity, (entity) => entity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "refreshTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => follow_entity_1.FollowEntity, (entity) => entity.followers),
    __metadata("design:type", Array)
], UserEntity.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => follow_entity_1.FollowEntity, (entity) => entity.followings),
    __metadata("design:type", Array)
], UserEntity.prototype, "followings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rating_venue_entity_1.RatingVenueEntity, (entity) => entity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pyachok_entity_1.PyachokEntity, (entity) => entity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "pyachok", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => venue_entity_1.VenueEntity, (venue) => venue.favoritedBy, {
        cascade: false,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'user_favorite_venues',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'venue_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "favoriteVenues", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)(table_name_enum_1.TableNameEnum.USERS)
], UserEntity);
//# sourceMappingURL=user.entity.js.map