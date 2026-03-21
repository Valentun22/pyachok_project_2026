import { NewsTypeEnum } from './enums/news-type.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { VenueEntity } from './venue.entity';
export declare class NewsEntity extends CreateUpdateModel {
    body: string;
    title: string;
    type: NewsTypeEnum;
    isActive: boolean;
    isPaid: boolean;
    avatarNews?: string;
    images?: string[];
    venue_id: string;
    venue?: VenueEntity;
}
