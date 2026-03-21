export declare class CommentS3Service {
    private readonly s3;
    private readonly bucket;
    private readonly bucketUrl;
    uploadCheck(file: Express.Multer.File): Promise<{
        key: string;
        url: string;
    }>;
}
