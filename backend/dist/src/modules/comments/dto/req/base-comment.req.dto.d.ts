import { CommentRecommendationEnum } from '../../../../database/entities/enums/comment-recommendation';
export declare class BaseCommentReqDto {
    body: string;
    title: string;
    image_check?: string;
    rating: number;
    recommendation?: CommentRecommendationEnum;
}
