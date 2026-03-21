import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
export declare class FollowEntity extends CreateUpdateModel {
    follower_id: string;
    followers?: UserEntity;
    following_id: string;
    followings?: UserEntity;
}
