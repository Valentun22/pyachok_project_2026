import { Redis } from 'ioredis';
export declare class RedisService {
    private readonly redisClient;
    constructor(redisClient: Redis);
    addOneToSet(hash: string, value: string): Promise<number>;
    remOneFromSet(key: string, setMember: string): Promise<number>;
    deleteByKey(key: string): Promise<number>;
    sMembers(key: string): Promise<string[]>;
    expire(key: string, time: number): Promise<number>;
}
