import { VenueResDto } from '../../../venue/dto/res/venue.res.dto';
import { TopCategoryResDto } from './top-category.res.dto';
export declare class TopCategoryWithVenuesResDto {
    category: TopCategoryResDto;
    venues: VenueResDto[];
}
