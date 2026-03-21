import { IUserData } from '../../auth/interfaces/user-data.interface';
import { MessageRepository } from '../../repository/services/message.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { SendMessageReqDto } from '../dto/req/send-message.req.dto';
import { MessageListResDto, MessageResDto } from '../dto/res/message.res.dto';
export declare class MessageService {
    private readonly messageRepo;
    private readonly userRepo;
    constructor(messageRepo: MessageRepository, userRepo: UserRepository);
    private toDto;
    send(sender: IUserData, recipientId: string, dto: SendMessageReqDto): Promise<MessageResDto>;
    getInbox(user: IUserData, limit?: number, offset?: number): Promise<MessageListResDto>;
    getSent(user: IUserData, limit?: number, offset?: number): Promise<MessageListResDto>;
    markRead(user: IUserData, messageId: string): Promise<void>;
    markAllRead(user: IUserData): Promise<void>;
    deleteMessage(user: IUserData, messageId: string): Promise<void>;
    countUnread(user: IUserData): Promise<{
        count: number;
    }>;
}
