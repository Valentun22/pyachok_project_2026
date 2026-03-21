"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OAuthVerifyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthVerifyService = void 0;
const common_1 = require("@nestjs/common");
const https = require("https");
const oauth_provider_enum_1 = require("../../../database/entities/enums/oauth-provider.enum");
const httpGet = (url) => new Promise((resolve, reject) => {
    https
        .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
            try {
                resolve(JSON.parse(data));
            }
            catch {
                reject(new Error('Invalid JSON: ' + data));
            }
        });
    })
        .on('error', reject);
});
let OAuthVerifyService = OAuthVerifyService_1 = class OAuthVerifyService {
    constructor() {
        this.logger = new common_1.Logger(OAuthVerifyService_1.name);
    }
    async verify(provider, token) {
        switch (provider) {
            case oauth_provider_enum_1.OAuthProviderEnum.GOOGLE:
            case oauth_provider_enum_1.OAuthProviderEnum.GOOGLE_PLAY:
                return await this.verifyGoogle(token);
            case oauth_provider_enum_1.OAuthProviderEnum.FACEBOOK:
                return await this.verifyFacebook(token);
            case oauth_provider_enum_1.OAuthProviderEnum.APP_STORE:
                throw new common_1.UnauthorizedException('Sign In with Apple ще не підключено');
            default:
                throw new common_1.UnauthorizedException('Непідтримуваний OAuth провайдер');
        }
    }
    async verifyGoogle(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new common_1.UnauthorizedException('Невалідний формат Google токена');
            }
            const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
            this.logger.log('Google JWT payload: ' +
                JSON.stringify({
                    sub: payload.sub,
                    email: payload.email,
                    aud: payload.aud,
                    exp: payload.exp,
                    iss: payload.iss,
                }));
            if (!payload.sub || !payload.email) {
                throw new common_1.UnauthorizedException('Google токен не містить даних користувача');
            }
            if (!['accounts.google.com', 'https://accounts.google.com'].includes(payload.iss)) {
                throw new common_1.UnauthorizedException('Невалідний Google токен: невірний issuer');
            }
            const now = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < now) {
                throw new common_1.UnauthorizedException('Google токен прострочений');
            }
            return {
                oauthId: payload.sub,
                email: payload.email,
                name: payload.name || payload.email.split('@')[0],
                image: payload.picture,
            };
        }
        catch (e) {
            if (e instanceof common_1.UnauthorizedException)
                throw e;
            this.logger.error('Google OAuth decode error: ' + String(e));
            throw new common_1.UnauthorizedException('Помилка обробки Google токена');
        }
    }
    async verifyFacebook(token) {
        try {
            const data = await httpGet(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);
            if (data.error || !data.id) {
                throw new common_1.UnauthorizedException('Невалідний Facebook токен');
            }
            return {
                oauthId: data.id,
                email: data.email || `fb_${data.id}@facebook.com`,
                name: data.name || 'Facebook User',
                image: data.picture?.data?.url,
            };
        }
        catch (e) {
            if (e instanceof common_1.UnauthorizedException)
                throw e;
            throw new common_1.UnauthorizedException('Помилка верифікації Facebook токена');
        }
    }
};
exports.OAuthVerifyService = OAuthVerifyService;
exports.OAuthVerifyService = OAuthVerifyService = OAuthVerifyService_1 = __decorate([
    (0, common_1.Injectable)()
], OAuthVerifyService);
//# sourceMappingURL=o-auth-verify.service.js.map