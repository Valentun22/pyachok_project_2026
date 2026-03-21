"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const app_setting_repository_1 = require("./services/app-setting.repository");
const comment_repository_1 = require("./services/comment.repository");
const complaint_repository_1 = require("./services/complaint.repository");
const follow_repository_1 = require("./services/follow.repository");
const like_repository_1 = require("./services/like.repository");
const message_repository_1 = require("./services/message.repository");
const news_repository_1 = require("./services/news.repository");
const pyachok_repository_1 = require("./services/pyachok.repository");
const rating_venue_repository_1 = require("./services/rating-venue.repository");
const refresh_token_repository_1 = require("./services/refresh-token.repository");
const tag_repository_1 = require("./services/tag.repository");
const top_repository_1 = require("./services/top.repository");
const user_repository_1 = require("./services/user.repository");
const venue_repository_1 = require("./services/venue.repository");
const venue_view_repository_1 = require("./services/venue-view.repository");
const repositories = [
    app_setting_repository_1.AppSettingRepository,
    venue_repository_1.VenueRepository,
    comment_repository_1.CommentRepository,
    complaint_repository_1.ComplaintRepository,
    follow_repository_1.FollowRepository,
    like_repository_1.LikeRepository,
    message_repository_1.MessageRepository,
    refresh_token_repository_1.RefreshTokenRepository,
    tag_repository_1.TagRepository,
    pyachok_repository_1.PyachokRepository,
    user_repository_1.UserRepository,
    news_repository_1.NewsRepository,
    rating_venue_repository_1.RatingVenueRepository,
    venue_view_repository_1.VenueViewRepository,
    top_repository_1.TopRepository,
];
let RepositoryModule = class RepositoryModule {
};
exports.RepositoryModule = RepositoryModule;
exports.RepositoryModule = RepositoryModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: repositories,
        exports: repositories,
    })
], RepositoryModule);
//# sourceMappingURL=repository.module.js.map