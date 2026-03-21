"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path = require("node:path");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const global_exception_filter_1 = require("../common/http/global-exception.filter");
const configuration_1 = require("../config/configuration");
const admin_module_1 = require("./admin/admin.module");
const auth_module_1 = require("./auth/auth.module");
const comment_module_1 = require("./comments/comment.module");
const email_module_1 = require("./email/email.module");
const file_storage_module_1 = require("./file-storage/file-storage.module");
const logger_module_1 = require("./logger/logger.module");
const message_module_1 = require("./messages/message.module");
const news_module_1 = require("./news/news.module");
const postgres_module_1 = require("./postgres/postgres.module");
const pyachok_module_1 = require("./pyachok/pyachok.module");
const redis_module_1 = require("./redis/redis.module");
const repository_module_1 = require("./repository/repository.module");
const tag_module_1 = require("./tag/tag.module");
const top_module_1 = require("./top/top.module");
const users_module_1 = require("./users/users.module");
const venue_module_1 = require("./venue/venue.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60,
                    limit: 100,
                },
            ]),
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
                envFilePath: path.resolve(process.cwd(), 'environments', 'local.env'),
            }),
            postgres_module_1.PostgresModule,
            redis_module_1.RedisModule,
            admin_module_1.AdminModule,
            auth_module_1.AuthModule,
            email_module_1.EmailModule,
            users_module_1.UsersModule,
            venue_module_1.VenueModule,
            pyachok_module_1.PyachokModule,
            comment_module_1.CommentModule,
            tag_module_1.TagModule,
            message_module_1.MessageModule,
            news_module_1.NewsModule,
            top_module_1.TopModule,
            logger_module_1.LoggerModule,
            repository_module_1.RepositoryModule,
            file_storage_module_1.FileStorageModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: global_exception_filter_1.GlobalExceptionFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map