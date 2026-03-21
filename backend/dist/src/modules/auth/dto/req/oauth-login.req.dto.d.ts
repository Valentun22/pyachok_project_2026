import { OAuthProviderEnum } from '../../../../database/entities/enums/oauth-provider.enum';
export declare class OAuthLoginReqDto {
    provider: OAuthProviderEnum;
    token: string;
    deviceId?: string;
}
