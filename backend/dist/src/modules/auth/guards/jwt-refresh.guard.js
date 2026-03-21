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
exports.JwtRefreshGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const refresh_token_repository_1 = require("../../repository/services/refresh-token.repository");
const user_repository_1 = require("../../repository/services/user.repository");
const user_mapper_1 = require("../../users/services/user.mapper");
const token_type_enum_1 = require("../enums/token-type.enum");
const token_service_1 = require("../services/token.service");
let JwtRefreshGuard = class JwtRefreshGuard {
    constructor(reflector, tokenService, refreshTokenRepository, userRepository) {
        this.reflector = reflector;
        this.tokenService = tokenService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const refreshToken = request.get('Authorization')?.split('Bearer ')[1];
        if (!refreshToken) {
            throw new common_1.UnauthorizedException();
        }
        const payload = await this.tokenService.verifyToken(refreshToken, token_type_enum_1.TokenType.REFRESH);
        if (!payload) {
            throw new common_1.UnauthorizedException();
        }
        const isRefreshTokenExist = await this.refreshTokenRepository.isRefreshTokenExist(refreshToken);
        if (!isRefreshTokenExist) {
            throw new common_1.UnauthorizedException();
        }
        const user = await this.userRepository.findOneBy({
            id: payload.userId,
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        request.user = user_mapper_1.UserMapper.toIUserData(user, payload);
        return true;
    }
};
exports.JwtRefreshGuard = JwtRefreshGuard;
exports.JwtRefreshGuard = JwtRefreshGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        token_service_1.TokenService,
        refresh_token_repository_1.RefreshTokenRepository,
        user_repository_1.UserRepository])
], JwtRefreshGuard);
//# sourceMappingURL=jwt-refresh.guard.js.map