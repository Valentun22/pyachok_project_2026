import { ComplaintStatusEnum } from './enums/complaint-status.enum';
import { ComplaintTypeEnum } from './enums/complaint-type.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
import { VenueEntity } from './venue.entity';
export declare class ComplaintEntity extends CreateUpdateModel {
    venue_id: string;
    venue?: VenueEntity;
    user_id: string;
    user?: UserEntity;
    type: ComplaintTypeEnum;
    targetId?: string;
    reason: string;
    status: ComplaintStatusEnum;
}
