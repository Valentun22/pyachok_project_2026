import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateNewsReqDto } from './dto/req/create-news.req.dto';
import { NewsListQueryDto } from './dto/req/news-list.query.dto';
import { UpdateNewsReqDto } from './dto/req/update-news.req.dto';
import { UpdateNewsActiveReqDto } from './dto/req/update-news-active.req.dto';
import { NewsResDto } from './dto/res/news.res.dto';
import { NewsListResDto } from './dto/res/news-list.res.dto';
import { NewsService } from './services/news.service';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    create(userData: IUserData, venueId: string, dto: CreateNewsReqDto): Promise<NewsResDto>;
    update(userData: IUserData, newsId: string, dto: UpdateNewsReqDto): Promise<NewsResDto>;
    updateActive(userData: IUserData, newsId: string, dto: UpdateNewsActiveReqDto): Promise<NewsResDto>;
    getVenueManageList(userData: IUserData, venueId: string, query: NewsListQueryDto): Promise<NewsListResDto>;
    delete(userData: IUserData, newsId: string): Promise<void>;
    getGlobalList(query: NewsListQueryDto): Promise<NewsListResDto>;
    getVenueList(venueId: string, query: NewsListQueryDto): Promise<NewsListResDto>;
    updatePaid(userData: IUserData, newsId: string, dto: UpdateNewsActiveReqDto): Promise<NewsResDto>;
}
