import { OAuthProviderEnum } from '../../../database/entities/enums/oauth-provider.enum';
export interface IOAuthUserData {
    oauthId: string;
    email: string;
    name: string;
    image?: string;
}
export declare class OAuthVerifyService {
    private readonly logger;
    verify(provider: OAuthProviderEnum, token: string): Promise<IOAuthUserData>;
    private verifyGoogle;
    private fetchGooglePicture;
    private verifyFacebook;
}
