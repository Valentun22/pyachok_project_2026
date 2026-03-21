import { VenueListItemResDto } from '../../../venue/dto/res/venue-list-item.res.dto';
export declare class VenueWithMyRatingItemResDto extends VenueListItemResDto {
    myRating: number;
}
export declare class MyRatingListResDto {
    data: VenueWithMyRatingItemResDto[];
    total: number;
    limit: number;
    offset: number;
}
