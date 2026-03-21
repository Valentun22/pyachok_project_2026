import { EmailService } from '../../email/services/email.service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UsersService } from '../../users/services/users.service';
import { OAuthLoginReqDto } from '../dto/req/oauth-login.req.dto';
import { SignInReqDto } from '../dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../dto/req/sign-up.req.dto';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache.service';
import { OAuthVerifyService } from './oauth-verify.service';
import { TokenService } from './token.service';
export declare class AuthService {
    private readonly refreshTokenRepository;
    private readonly userRepository;
    private readonly userService;
    private readonly tokenService;
    private readonly authCacheService;
    private readonly oAuthVerifyService;
    private readonly emailService;
    constructor(refreshTokenRepository: RefreshTokenRepository, userRepository: UserRepository, userService: UsersService, tokenService: TokenService, authCacheService: AuthCacheService, oAuthVerifyService: OAuthVerifyService, emailService: EmailService);
    signUp(dto: SignUpReqDto): Promise<{
        message: string;
    }>;
    signIn(dto: SignInReqDto): Promise<AuthResDto>;
    oAuthLogin(dto: OAuthLoginReqDto): Promise<AuthResDto>;
    refresh(userData: IUserData): Promise<TokenPairResDto>;
    signOut(userData: IUserData): Promise<void>;
    verifyEmail(token: string): Promise<void>;
    resendVerificationEmail(userId: string): Promise<void>;
}
