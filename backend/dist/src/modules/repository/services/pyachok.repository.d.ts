import { DataSource, Repository } from 'typeorm';
import { PyachokEntity } from '../../../database/entities/pyachok.entity';
import { PyachokListQueryDto } from '../../pyachok/dto/req/pyachok-list.query.dto';
export declare class PyachokRepository extends Repository<PyachokEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getVenuePublicList(venueId: string, query: PyachokListQueryDto): Promise<[PyachokEntity[], number]>;
    getVenueManageList(venueId: string, query: PyachokListQueryDto): Promise<[PyachokEntity[], number]>;
    getOpenFeed(query: PyachokListQueryDto): Promise<[PyachokEntity[], number]>;
}
