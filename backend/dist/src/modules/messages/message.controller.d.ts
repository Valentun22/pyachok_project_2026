import { IUserData } from '../auth/interfaces/user-data.interface';
import { SendMessageReqDto } from './dto/req/send-message.req.dto';
import { MessageService } from './services/message.service';
export declare class MessageController {
    private readonly service;
    constructor(service: MessageService);
    inbox(user: IUserData, limit?: string, offset?: string): Promise<import("./dto/res/message.res.dto").MessageListResDto>;
    sent(user: IUserData, limit?: string, offset?: string): Promise<import("./dto/res/message.res.dto").MessageListResDto>;
    unreadCount(user: IUserData): Promise<{
        count: number;
    }>;
    markAllRead(user: IUserData): Promise<void>;
    send(recipientId: string, user: IUserData, dto: SendMessageReqDto): Promise<import("./dto/res/message.res.dto").MessageResDto>;
    markRead(id: string, user: IUserData): Promise<void>;
    delete(id: string, user: IUserData): Promise<void>;
}
