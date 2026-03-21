import { DataSource, Repository } from 'typeorm';
import { RatingVenueEntity } from '../../../database/entities/rating-venue.entity';
export declare class RatingVenueRepository extends Repository<RatingVenueEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findMyRatedVenues(userId: string, limit: number, offset: number): Promise<[RatingVenueEntity[], number]>;
}
