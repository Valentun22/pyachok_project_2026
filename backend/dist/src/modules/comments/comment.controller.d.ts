import { IUserData } from '../auth/interfaces/user-data.interface';
import { CommentListQueryDto } from './dto/req/comment-list.query.dto';
import { CreateCommentReqDto } from './dto/req/create-comment.req.dto';
import { UpdateCommentReqDto } from './dto/req/update-comment.req.dto';
import { CommentResDto } from './dto/res/comment.res.dto';
import { CommentListResDto } from './dto/res/comment-list.res.dto';
import { CommentService } from './services/comment.service';
import { CommentS3Service } from './services/comment-s3.service';
export declare class CommentController {
    private readonly service;
    private readonly commentS3Service;
    constructor(service: CommentService, commentS3Service: CommentS3Service);
    getListByVenue(userData: IUserData, venueId: string, query: CommentListQueryDto): Promise<CommentListResDto>;
    create(userData: IUserData, venueId: string, dto: CreateCommentReqDto): Promise<CommentResDto>;
    getById(userData: IUserData, commentId: string): Promise<CommentResDto>;
    update(userData: IUserData, commentId: string, dto: UpdateCommentReqDto): Promise<CommentResDto>;
    delete(userData: IUserData, commentId: string): Promise<void>;
    uploadCheck(file: Express.Multer.File): Promise<{
        key: string;
        url: string;
    }>;
}
