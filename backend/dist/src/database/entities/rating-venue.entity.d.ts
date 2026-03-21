import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
import { VenueEntity } from './venue.entity';
export declare class RatingVenueEntity extends CreateUpdateModel {
    rating: number;
    user_id: string;
    user?: UserEntity;
    venue_id: string;
    venue?: VenueEntity;
}
