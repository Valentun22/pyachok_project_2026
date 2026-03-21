import { NewsEntity } from '../../../database/entities/news.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { NewsRepository } from '../../repository/services/news.repository';
import { VenueRepository } from '../../repository/services/venue.repository';
import { CreateNewsReqDto } from '../dto/req/create-news.req.dto';
import { NewsListQueryDto } from '../dto/req/news-list.query.dto';
import { UpdateNewsReqDto } from '../dto/req/update-news.req.dto';
import { NewsListResDto } from '../dto/res/news-list.res.dto';
export declare class NewsService {
    private readonly newsRepository;
    private readonly venueRepository;
    constructor(newsRepository: NewsRepository, venueRepository: VenueRepository);
    create(userData: IUserData, venueId: string, dto: CreateNewsReqDto): Promise<NewsEntity>;
    private canManageNews;
    update(userData: IUserData, newsId: string, dto: UpdateNewsReqDto): Promise<NewsEntity>;
    updateActive(userData: IUserData, newsId: string, isActive: boolean): Promise<NewsEntity>;
    updatePaid(userData: IUserData, newsId: string, isPaid: boolean): Promise<NewsEntity>;
    delete(userData: IUserData, newsId: string): Promise<void>;
    getVenueManageList(userData: IUserData, venueId: string, query: NewsListQueryDto): Promise<NewsListResDto>;
    getGlobalList(query: NewsListQueryDto): Promise<NewsListResDto>;
    getVenueList(venueId: string, query: NewsListQueryDto): Promise<NewsListResDto>;
}
