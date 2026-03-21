import { ConfigService } from '@nestjs/config/dist/config.service';
import { Config } from '../../../config/config.type';
import { RedisService } from '../../redis/redis.service';
export declare class AuthCacheService {
    private readonly redisService;
    private readonly configService;
    private jwtConfig;
    constructor(redisService: RedisService, configService: ConfigService<Config>);
    saveToken(token: string, userId: string, deviceId: string): Promise<void>;
    isAccessTokenExist(userId: string, deviceId: string, token: string): Promise<boolean>;
    deleteToken(userId: string, deviceId: string): Promise<void>;
    private getKey;
}
