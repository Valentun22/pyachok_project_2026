import { CreateUpdateModel } from './models/create-update.model';
import { PyachokEntity } from './pyachok.entity';
import { UserEntity } from './user.entity';
export declare class MessageEntity extends CreateUpdateModel {
    text: string;
    isRead: boolean;
    sender_id: string;
    sender?: UserEntity;
    recipient_id: string;
    recipient?: UserEntity;
    pyachok_id?: string;
    pyachok?: PyachokEntity;
}
