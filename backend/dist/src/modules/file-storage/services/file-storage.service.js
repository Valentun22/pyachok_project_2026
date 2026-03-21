"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageService = void 0;
const node_crypto_1 = require("node:crypto");
const path = require("node:path");
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const logger_service_1 = require("../../logger/logger.service");
let FileStorageService = class FileStorageService {
    constructor(logger, configService) {
        this.logger = logger;
        this.configService = configService;
        this.awsConfig = this.configService.get('aws');
        this.s3Client = new client_s3_1.S3Client({
            forcePathStyle: true,
            endpoint: this.awsConfig.endpoint || undefined,
            region: this.awsConfig.region,
            credentials: {
                accessKeyId: this.awsConfig.accessKeyId,
                secretAccessKey: this.awsConfig.secretAccessKey,
            },
        });
    }
    async uploadFile(file, itemType, itemId) {
        try {
            const filePath = this.buildPath(itemType, itemId, file.originalname);
            this.logger.log(`S3 upload → bucket: ${this.awsConfig.bucketName}, key: ${filePath}`);
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: this.awsConfig.bucketName,
                Key: filePath,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read',
            }));
            const fullUrl = `${this.awsConfig.publicUrl}/${filePath}`;
            this.logger.log(`S3 upload success → ${fullUrl}`);
            return fullUrl;
        }
        catch (error) {
            this.logger.error(`S3 upload FAILED: ${error?.message ?? error}`);
            throw error;
        }
    }
    async deleteFile(filePath) {
        try {
            const key = filePath.startsWith('http')
                ? filePath.replace(`${this.awsConfig.bucketUrl}/`, '')
                : filePath;
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.awsConfig.bucketName,
                Key: key,
            }));
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    buildPath(itemType, itemId, fileName) {
        return `${itemType}/${itemId}/${(0, node_crypto_1.randomUUID)()}${path.extname(fileName)}`;
    }
};
exports.FileStorageService = FileStorageService;
exports.FileStorageService = FileStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        config_1.ConfigService])
], FileStorageService);
//# sourceMappingURL=file-storage.service.js.map