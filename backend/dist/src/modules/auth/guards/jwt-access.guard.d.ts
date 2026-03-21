import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '../../repository/services/user.repository';
import { AuthCacheService } from '../services/auth-cache.service';
import { TokenService } from '../services/token.service';
export declare class JwtAccessGuard implements CanActivate {
    private readonly reflector;
    private readonly tokenService;
    private readonly authCacheService;
    private readonly userRepository;
    constructor(reflector: Reflector, tokenService: TokenService, authCacheService: AuthCacheService, userRepository: UserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
