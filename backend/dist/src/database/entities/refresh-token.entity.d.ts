import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
export declare class RefreshTokenEntity extends CreateUpdateModel {
    refreshToken: string;
    deviceId: string;
    user_id: string;
    user?: UserEntity;
}
