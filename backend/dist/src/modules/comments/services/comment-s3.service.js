"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentS3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const path_1 = require("path");
let CommentS3Service = class CommentS3Service {
    constructor() {
        this.s3 = new client_s3_1.S3Client({
            region: process.env.AWS_S3_REGION,
            endpoint: process.env.AWS_S3_ENDPOINT || undefined,
            forcePathStyle: true,
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESS_KEY,
                secretAccessKey: process.env.AWS_S3_SECRET_KEY,
            },
        });
        this.bucket = process.env.AWS_S3_BUCKET_NAME;
        this.bucketUrl = process.env.AWS_S3_BUCKET_URL;
    }
    async uploadCheck(file) {
        const ext = ((0, path_1.extname)(file.originalname) || '.jpg').toLowerCase();
        const key = `comments/checks/${(0, crypto_1.randomUUID)()}${ext}`;
        await this.s3.send(new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        }));
        return {
            key,
            url: `${this.bucketUrl}/${key}`,
        };
    }
};
exports.CommentS3Service = CommentS3Service;
exports.CommentS3Service = CommentS3Service = __decorate([
    (0, common_1.Injectable)()
], CommentS3Service);
//# sourceMappingURL=comment-s3.service.js.map