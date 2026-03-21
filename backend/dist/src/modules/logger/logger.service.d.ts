import { ConfigService } from '@nestjs/config';
import { Config } from '../../config/config.type';
export declare class LoggerService {
    private readonly configService;
    private readonly isLocal;
    private readonly logger;
    constructor(configService: ConfigService<Config>);
    log(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(error: any): void;
}
