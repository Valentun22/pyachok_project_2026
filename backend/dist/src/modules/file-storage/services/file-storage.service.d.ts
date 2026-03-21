import { ConfigService } from '@nestjs/config';
import { Config } from '../../../config/config.type';
import { LoggerService } from '../../logger/logger.service';
import { ContentType } from '../enums/content-type.enum';
export declare class FileStorageService {
    private readonly logger;
    private readonly configService;
    private readonly awsConfig;
    private readonly s3Client;
    constructor(logger: LoggerService, configService: ConfigService<Config>);
    uploadFile(file: Express.Multer.File, itemType: ContentType, itemId: string): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
    private buildPath;
}
