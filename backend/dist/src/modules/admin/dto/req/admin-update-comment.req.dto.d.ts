import { CommentRecommendationEnum } from '../../../../database/entities/enums/comment-recommendation';
export declare class AdminUpdateCommentReqDto {
    title?: string;
    body?: string;
    rating?: number;
    recommendation?: CommentRecommendationEnum | null;
    image_check?: string | null;
}
