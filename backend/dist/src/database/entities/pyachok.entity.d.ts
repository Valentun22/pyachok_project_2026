import { PyachokStatusEnum } from '../../modules/pyachok/enums/pyachok-status.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
import { VenueEntity } from './venue.entity';
export declare class PyachokEntity extends CreateUpdateModel {
    date: string;
    time: string;
    purpose?: string;
    peopleCount?: number;
    genderPreference?: string;
    payer?: string;
    expectedBudget?: number;
    status: PyachokStatusEnum;
    user_id: string;
    user: UserEntity;
    message?: string;
    venue_id: string;
    venue: VenueEntity;
}
