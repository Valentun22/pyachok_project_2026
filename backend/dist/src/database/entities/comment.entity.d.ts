import { CommentRecommendationEnum } from './enums/comment-recommendation';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
import { VenueEntity } from './venue.entity';
export declare class CommentEntity extends CreateUpdateModel {
    body: string;
    title: string;
    image_check?: string;
    rating: number;
    recommendation?: CommentRecommendationEnum | null;
    user_id: string;
    user?: UserEntity;
    venue_id: string;
    venue?: VenueEntity;
}
