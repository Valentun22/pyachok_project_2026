"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const email_module_1 = require("../email/email.module");
const redis_module_1 = require("../redis/redis.module");
const repository_module_1 = require("../repository/repository.module");
const users_module_1 = require("../users/users.module");
const auth_controller_1 = require("./auth.controller");
const jwt_access_guard_1 = require("./guards/jwt-access.guard");
const auth_service_1 = require("./services/auth.service");
const auth_cache_service_1 = require("./services/auth-cache.service");
const oauth_verify_service_1 = require("./services/oauth-verify.service");
const token_service_1 = require("./services/token.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule,
            repository_module_1.RepositoryModule,
            redis_module_1.RedisModule,
            email_module_1.EmailModule,
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_access_guard_1.JwtAccessGuard,
            },
            auth_service_1.AuthService,
            token_service_1.TokenService,
            auth_cache_service_1.AuthCacheService,
            jwt_access_guard_1.JwtAccessGuard,
            oauth_verify_service_1.OAuthVerifyService,
        ],
        exports: [token_service_1.TokenService, auth_cache_service_1.AuthCacheService, jwt_access_guard_1.JwtAccessGuard],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map