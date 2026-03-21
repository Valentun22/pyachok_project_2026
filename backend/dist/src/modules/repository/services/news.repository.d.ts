import { DataSource, Repository } from 'typeorm';
import { NewsEntity } from '../../../database/entities/news.entity';
import { NewsListQueryDto } from '../../news/dto/req/news-list.query.dto';
export declare class NewsRepository extends Repository<NewsEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getVenueManageList(venueId: string, query: NewsListQueryDto): Promise<[NewsEntity[], number]>;
    findByIdWithVenueOwner(newsId: string): Promise<NewsEntity | null>;
    getGlobalList(query: NewsListQueryDto): Promise<[NewsEntity[], number]>;
    getVenueList(venueId: string, query: NewsListQueryDto): Promise<[NewsEntity[], number]>;
}
