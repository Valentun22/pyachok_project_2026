import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { TokenService } from '../services/token.service';
export declare class JwtRefreshGuard implements CanActivate {
    private readonly reflector;
    private readonly tokenService;
    private readonly refreshTokenRepository;
    private readonly userRepository;
    constructor(reflector: Reflector, tokenService: TokenService, refreshTokenRepository: RefreshTokenRepository, userRepository: UserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
