import { NewsTypeEnum } from '../../../../database/entities/enums/news-type.enum';
export declare class UpdateNewsReqDto {
    title?: string;
    body?: string;
    type?: NewsTypeEnum;
    avatarNews?: string;
    images?: string[];
    isActive?: boolean;
}
