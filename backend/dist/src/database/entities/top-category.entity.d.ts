import { CreateUpdateModel } from './models/create-update.model';
import { TopCategoryVenueEntity } from './top-category-venue.entity';
export declare class TopCategoryEntity extends CreateUpdateModel {
    title: string;
    slug: string;
    isActive: boolean;
    order: number;
    items?: TopCategoryVenueEntity[];
}
