import { CreateUpdateModel } from './models/create-update.model';
import { VenueEntity } from './venue.entity';
export declare class TagEntity extends CreateUpdateModel {
    name: string;
    venueCount?: number;
    venues?: VenueEntity[];
}
