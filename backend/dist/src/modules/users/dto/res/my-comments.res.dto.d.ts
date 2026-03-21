import { BaseCommentResDto } from '../../../comments/dto/res/base-comment.res.dto';
export declare class MyCommentsResDto {
    data: BaseCommentResDto[];
    total: number;
    page: number;
    limit: number;
}
