import { DataSource, EntityManager, Repository } from 'typeorm';
import { RoleUserEnum } from '../../../database/entities/enums/role.enum';
import { VenueEntity } from '../../../database/entities/venue.entity';
import { VenueListQueryDto } from '../../venue/dto/req/venue-list.query.dto';
export declare class VenueRepository extends Repository<VenueEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getList(userId: string | undefined, query: VenueListQueryDto, roles?: RoleUserEnum[]): Promise<[VenueEntity[], number]>;
    getById(userId: string | undefined, venueId: string, em?: EntityManager): Promise<VenueEntity>;
}
