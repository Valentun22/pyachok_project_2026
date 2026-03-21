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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const role_enum_1 = require("../../../database/entities/enums/role.enum");
const email_service_1 = require("../../email/services/email.service");
const refresh_token_repository_1 = require("../../repository/services/refresh-token.repository");
const user_repository_1 = require("../../repository/services/user.repository");
const user_mapper_1 = require("../../users/services/user.mapper");
const users_service_1 = require("../../users/services/users.service");
const auth_cache_service_1 = require("./auth-cache.service");
const oauth_verify_service_1 = require("./oauth-verify.service");
const token_service_1 = require("./token.service");
let AuthService = class AuthService {
    constructor(refreshTokenRepository, userRepository, userService, tokenService, authCacheService, oAuthVerifyService, emailService) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.tokenService = tokenService;
        this.authCacheService = authCacheService;
        this.oAuthVerifyService = oAuthVerifyService;
        this.emailService = emailService;
    }
    async signUp(dto) {
        await this.userService.isEmailExistOrThrow(dto.email);
        const password = await bcrypt.hash(dto.password, 10);
        const emailVerifyToken = crypto.randomBytes(32).toString('hex');
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const link = `${frontendUrl}/verify-email?token=${emailVerifyToken}`;
        await this.emailService.sendMail(dto.email, '🍺 Підтвердіть email — Пиячок', `Вітаємо! Щоб завершити реєстрацію, перейдіть за посиланням:

${link}

Посилання дійсне 24 години.`);
        await this.userRepository.save(this.userRepository.create({
            ...dto,
            password,
            role: [role_enum_1.RoleUserEnum.USER],
            isEmailVerified: false,
            emailVerifyToken,
        }));
        return { message: 'Лист з підтвердженням надіслано на вашу пошту' };
    }
    async signIn(dto) {
        const user = await this.userRepository.findOne({
            where: { email: dto.email },
            select: { id: true, password: true, isEmailVerified: true },
        });
        if (!user)
            throw new common_1.UnauthorizedException();
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException();
        if (!user.isEmailVerified) {
            throw new common_1.UnauthorizedException('Підтвердіть email перед входом. Перевірте вашу пошту.');
        }
        const tokens = await this.tokenService.generateAuthTokens({
            userId: user.id,
            deviceId: dto.deviceId,
        });
        await Promise.all([
            this.refreshTokenRepository.delete({
                deviceId: dto.deviceId,
                user_id: user.id,
            }),
            this.authCacheService.deleteToken(user.id, dto.deviceId),
        ]);
        await Promise.all([
            this.refreshTokenRepository.save({
                deviceId: dto.deviceId,
                refreshToken: tokens.refreshToken,
                user_id: user.id,
            }),
            this.authCacheService.saveToken(tokens.accessToken, user.id, dto.deviceId),
        ]);
        const userEntity = await this.userRepository.findOneBy({ id: user.id });
        return { user: user_mapper_1.UserMapper.toResponseDTO(userEntity), tokens };
    }
    async oAuthLogin(dto) {
        const oauthData = await this.oAuthVerifyService.verify(dto.provider, dto.token);
        let user = await this.userRepository.findOne({
            where: [
                {
                    oauthId: oauthData.oauthId,
                    oauthProvider: dto.provider,
                },
                { email: oauthData.email },
            ],
        });
        if (!user) {
            user = await this.userRepository.save(this.userRepository.create({
                name: oauthData.name,
                email: oauthData.email,
                image: oauthData.image,
                oauthProvider: dto.provider,
                oauthId: oauthData.oauthId,
                role: [role_enum_1.RoleUserEnum.USER],
            }));
        }
        else if (!user.oauthId) {
            await this.userRepository.update(user.id, {
                oauthProvider: dto.provider,
                oauthId: oauthData.oauthId,
                ...(!user.image && oauthData.image ? { image: oauthData.image } : {}),
            });
        }
        else if (oauthData.image && !user.image) {
            await this.userRepository.update(user.id, { image: oauthData.image });
            user.image = oauthData.image;
        }
        const deviceId = dto.deviceId ?? `oauth_${dto.provider}`;
        const tokens = await this.tokenService.generateAuthTokens({
            userId: user.id,
            deviceId,
        });
        await Promise.all([
            this.refreshTokenRepository.delete({ deviceId, user_id: user.id }),
            this.authCacheService.deleteToken(user.id, deviceId),
        ]);
        await Promise.all([
            this.refreshTokenRepository.save({
                deviceId,
                refreshToken: tokens.refreshToken,
                user_id: user.id,
            }),
            this.authCacheService.saveToken(tokens.accessToken, user.id, deviceId),
        ]);
        const freshUser = await this.userRepository.findOneBy({ id: user.id });
        return { user: user_mapper_1.UserMapper.toResponseDTO(freshUser), tokens };
    }
    async refresh(userData) {
        await Promise.all([
            this.refreshTokenRepository.delete({
                deviceId: userData.deviceId,
                user_id: userData.userId,
            }),
            this.authCacheService.deleteToken(userData.userId, userData.deviceId),
        ]);
        const tokens = await this.tokenService.generateAuthTokens({
            userId: userData.userId,
            deviceId: userData.deviceId,
        });
        await Promise.all([
            this.refreshTokenRepository.save({
                deviceId: userData.deviceId,
                refreshToken: tokens.refreshToken,
                user_id: userData.userId,
            }),
            this.authCacheService.saveToken(tokens.accessToken, userData.userId, userData.deviceId),
        ]);
        return tokens;
    }
    async signOut(userData) {
        await Promise.all([
            this.refreshTokenRepository.delete({
                deviceId: userData.deviceId,
                user_id: userData.userId,
            }),
            this.authCacheService.deleteToken(userData.userId, userData.deviceId),
        ]);
    }
    async verifyEmail(token) {
        const user = await this.userRepository.findOne({
            where: { emailVerifyToken: token },
            select: { id: true, isEmailVerified: true, emailVerifyToken: true },
        });
        if (!user)
            throw new common_1.BadRequestException('Невалідний або прострочений токен верифікації');
        if (user.isEmailVerified)
            return;
        await this.userRepository.update(user.id, {
            isEmailVerified: true,
            emailVerifyToken: null,
        });
    }
    async resendVerificationEmail(userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user)
            return;
        if (user.isEmailVerified)
            throw new common_1.BadRequestException('Email вже підтверджено');
        const emailVerifyToken = crypto.randomBytes(32).toString('hex');
        await this.userRepository.update(userId, { emailVerifyToken });
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const link = `${frontendUrl}/verify-email?token=${emailVerifyToken}`;
        await this.emailService.sendMail(user.email, '🍺 Підтвердіть email — Пиячок', `Перейдіть за посиланням для підтвердження email:

${link}

Посилання дійсне 24 години.`);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [refresh_token_repository_1.RefreshTokenRepository,
        user_repository_1.UserRepository,
        users_service_1.UsersService,
        token_service_1.TokenService,
        auth_cache_service_1.AuthCacheService,
        oauth_verify_service_1.OAuthVerifyService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map