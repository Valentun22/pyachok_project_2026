import { NewsTypeEnum } from '../../../../database/entities/enums/news-type.enum';
export declare class NewsListQueryDto {
    type?: NewsTypeEnum;
    offset?: number;
    limit?: number;
}
