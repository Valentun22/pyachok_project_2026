import { NewsTypeEnum } from '../../../../database/entities/enums/news-type.enum';
export declare class CreateNewsReqDto {
    title: string;
    body: string;
    type?: NewsTypeEnum;
    avatarNews?: string;
    images?: string[];
}
