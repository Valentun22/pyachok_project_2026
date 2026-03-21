import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfig, Config } from '../../../config/config.type';
import { LoggerService } from '../../logger/logger.service';
import { ContentType } from '../enums/content-type.enum';

@Injectable()
export class FileStorageService {
  private readonly awsConfig: AwsConfig;
  private readonly s3Client: S3Client;

  constructor(
    private readonly logger: LoggerService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.awsConfig = this.configService.get<AwsConfig>('aws');

    this.s3Client = new S3Client({
      forcePathStyle: true,
      endpoint: this.awsConfig.endpoint || undefined,
      region: this.awsConfig.region,
      credentials: {
        accessKeyId: this.awsConfig.accessKeyId,
        secretAccessKey: this.awsConfig.secretAccessKey,
      },
    });
  }

  public async uploadFile(
    file: Express.Multer.File,
    itemType: ContentType,
    itemId: string,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(itemType, itemId, file.originalname);
      this.logger.log(
        `S3 upload → bucket: ${this.awsConfig.bucketName}, key: ${filePath}`,
      );
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.awsConfig.bucketName,
          Key: filePath,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }),
      );
      const fullUrl = `${this.awsConfig.publicUrl}/${filePath}`;
      this.logger.log(`S3 upload success → ${fullUrl}`);
      return fullUrl;
    } catch (error) {
      this.logger.error(`S3 upload FAILED: ${error?.message ?? error}`);
      throw error;
    }
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      const key = filePath.startsWith('http')
        ? filePath.replace(`${this.awsConfig.bucketUrl}/`, '')
        : filePath;
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.awsConfig.bucketName,
          Key: key,
        }),
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  private buildPath(
    itemType: ContentType,
    itemId: string,
    fileName: string,
  ): string {
    return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`;
  }
}
