import { DataSource, Repository } from 'typeorm';
import { MessageEntity } from '../../../database/entities/message.entity';
export declare class MessageRepository extends Repository<MessageEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getInbox(userId: string, limit?: number, offset?: number): Promise<[MessageEntity[], number]>;
    getSent(userId: string, limit?: number, offset?: number): Promise<[MessageEntity[], number]>;
    countUnread(userId: string): Promise<number>;
}
