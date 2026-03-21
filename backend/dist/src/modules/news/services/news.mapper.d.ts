import { NewsEntity } from '../../../database/entities/news.entity';
import { NewsListQueryDto } from '../dto/req/news-list.query.dto';
import { NewsResDto } from '../dto/res/news.res.dto';
import { NewsListResDto } from '../dto/res/news-list.res.dto';
import { NewsListItemResDto } from '../dto/res/news-list-item.res.dto';
export declare class NewsMapper {
    static toListItemDTO(entity: NewsEntity): NewsListItemResDto;
    static toListDTO(entities: NewsEntity[], total: number, query: NewsListQueryDto): NewsListResDto;
    static toResponseDTO(entity: NewsEntity): NewsResDto;
}
