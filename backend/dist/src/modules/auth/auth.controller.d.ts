import { OAuthLoginReqDto } from './dto/req/oauth-login.req.dto';
import { SignInReqDto } from './dto/req/sign-in.req.dto';
import { SignUpReqDto } from './dto/req/sign-up.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { TokenPairResDto } from './dto/res/token-pair.res.dto';
import { IUserData } from './interfaces/user-data.interface';
import { AuthService } from './services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(dto: SignUpReqDto): Promise<{
        message: string;
    }>;
    signIn(dto: SignInReqDto): Promise<AuthResDto>;
    oAuthLogin(dto: OAuthLoginReqDto): Promise<AuthResDto>;
    verifyEmail(token: string): Promise<void>;
    resendVerification(userData: IUserData): Promise<void>;
    refresh(userData: IUserData): Promise<TokenPairResDto>;
    signOut(userData: IUserData): Promise<void>;
}
