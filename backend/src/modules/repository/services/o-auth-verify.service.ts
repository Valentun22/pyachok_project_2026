import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as https from 'https';

import { OAuthProviderEnum } from '../../../database/entities/enums/oauth-provider.enum';

export interface IOAuthUserData {
  oauthId: string;
  email: string;
  name: string;
  image?: string;
}

const httpGet = (url: string): Promise<any> =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error('Invalid JSON: ' + data));
          }
        });
      })
      .on('error', reject);
  });

@Injectable()
export class OAuthVerifyService {
  private readonly logger = new Logger(OAuthVerifyService.name);
  async verify(
    provider: OAuthProviderEnum,
    token: string,
  ): Promise<IOAuthUserData> {
    switch (provider) {
      case OAuthProviderEnum.GOOGLE:
      case OAuthProviderEnum.GOOGLE_PLAY:
        return await this.verifyGoogle(token);
      case OAuthProviderEnum.FACEBOOK:
        return await this.verifyFacebook(token);
      case OAuthProviderEnum.APP_STORE:
        throw new UnauthorizedException('Sign In with Apple ще не підключено');
      default:
        throw new UnauthorizedException('Непідтримуваний OAuth провайдер');
    }
  }

  private async verifyGoogle(token: string): Promise<IOAuthUserData> {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new UnauthorizedException('Невалідний формат Google токена');
      }

      const payload = JSON.parse(
        Buffer.from(parts[1], 'base64url').toString('utf8'),
      );

      this.logger.log(
        'Google JWT payload: ' +
          JSON.stringify({
            sub: payload.sub,
            email: payload.email,
            aud: payload.aud,
            exp: payload.exp,
            iss: payload.iss,
          }),
      );

      if (!payload.sub || !payload.email) {
        throw new UnauthorizedException(
          'Google токен не містить даних користувача',
        );
      }

      if (
        !['accounts.google.com', 'https://accounts.google.com'].includes(
          payload.iss,
        )
      ) {
        throw new UnauthorizedException(
          'Невалідний Google токен: невірний issuer',
        );
      }

      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        throw new UnauthorizedException('Google токен прострочений');
      }

      return {
        oauthId: payload.sub,
        email: payload.email,
        name: payload.name || payload.email.split('@')[0],
        image: payload.picture,
      };
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e;
      this.logger.error('Google OAuth decode error: ' + String(e));
      throw new UnauthorizedException('Помилка обробки Google токена');
    }
  }

  private async verifyFacebook(token: string): Promise<IOAuthUserData> {
    try {
      const data = await httpGet(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`,
      );

      if (data.error || !data.id) {
        throw new UnauthorizedException('Невалідний Facebook токен');
      }

      return {
        oauthId: data.id,
        email: data.email || `fb_${data.id}@facebook.com`,
        name: data.name || 'Facebook User',
        image: data.picture?.data?.url,
      };
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e;
      throw new UnauthorizedException('Помилка верифікації Facebook токена');
    }
  }
}
