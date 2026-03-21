import { UserResDto } from '../../../users/dto/res/user.res.dto';
import { TokenPairResDto } from './token-pair.res.dto';
export declare class AuthResDto {
    tokens: TokenPairResDto;
    user: UserResDto;
}
