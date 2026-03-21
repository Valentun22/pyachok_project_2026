import { VenueListQueryDto } from '../req/venue-list.query.dto';
import { VenueListItemResDto } from './venue-list-item.res.dto';
export declare class VenueListResDto extends VenueListQueryDto {
    data: VenueListItemResDto[];
    total: number;
}
