import { VenueEntity } from '../../../database/entities/venue.entity';
import { VenueListQueryDto } from '../dto/req/venue-list.query.dto';
import { VenueResDto } from '../dto/res/venue.res.dto';
import { VenueListResDto } from '../dto/res/venue-list.res.dto';
import { VenueListItemResDto } from '../dto/res/venue-list-item.res.dto';
type VenueMapperOpts = {
    isFavorite?: boolean;
};
export declare class VenueMapper {
    static toResponseListDTO(entities: VenueEntity[], total: number, query: VenueListQueryDto): VenueListResDto;
    static toResponseListItemDTO(entity: VenueEntity, opts?: VenueMapperOpts): VenueListItemResDto;
    static toResponseDTO(entity: VenueEntity, opts?: VenueMapperOpts): VenueResDto;
}
export {};
