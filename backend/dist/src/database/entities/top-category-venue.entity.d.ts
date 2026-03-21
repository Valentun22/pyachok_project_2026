import { CreateUpdateModel } from './models/create-update.model';
import { TopCategoryEntity } from './top-category.entity';
import { VenueEntity } from './venue.entity';
export declare class TopCategoryVenueEntity extends CreateUpdateModel {
    category_id: string;
    venue_id: string;
    order: number;
    category?: TopCategoryEntity;
    venue?: VenueEntity;
}
