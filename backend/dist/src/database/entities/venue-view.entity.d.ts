import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
import { VenueEntity } from './venue.entity';
export declare class VenueViewEntity extends CreateUpdateModel {
    venue_id: string;
    venue?: VenueEntity;
    user_id?: string;
    user?: UserEntity;
    ip?: string;
    userAgent?: string;
}
