import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { MessageEntity } from '../../../database/entities/message.entity';

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MessageEntity, dataSource.manager);
  }

  public async getInbox(
    userId: string,
    limit = 20,
    offset = 0,
  ): Promise<[MessageEntity[], number]> {
    return await this.createQueryBuilder('msg')
      .leftJoinAndSelect('msg.sender', 'sender')
      .leftJoinAndSelect('msg.pyachok', 'pyachok')
      .leftJoinAndSelect('pyachok.venue', 'venue')
      .where('msg.recipient_id = :userId', { userId })
      .orderBy('msg.created', 'DESC')
      .take(limit)
      .skip(offset)
      .getManyAndCount();
  }

  public async getSent(
    userId: string,
    limit = 20,
    offset = 0,
  ): Promise<[MessageEntity[], number]> {
    return await this.createQueryBuilder('msg')
      .leftJoinAndSelect('msg.recipient', 'recipient')
      .leftJoinAndSelect('msg.pyachok', 'pyachok')
      .leftJoinAndSelect('pyachok.venue', 'venue')
      .where('msg.sender_id = :userId', { userId })
      .orderBy('msg.created', 'DESC')
      .take(limit)
      .skip(offset)
      .getManyAndCount();
  }

  public async getDialog(
    userId: string,
    otherUserId: string,
    limit = 50,
    offset = 0,
  ): Promise<[MessageEntity[], number]> {
    return await this.createQueryBuilder('msg')
      .leftJoinAndSelect('msg.sender', 'sender')
      .leftJoinAndSelect('msg.recipient', 'recipient')
      .where(
        '(msg.sender_id = :userId AND msg.recipient_id = :otherUserId)' +
          ' OR (msg.sender_id = :otherUserId AND msg.recipient_id = :userId)',
        { userId, otherUserId },
      )
      .orderBy('msg.created', 'ASC')
      .take(limit)
      .skip(offset)
      .getManyAndCount();
  }

  public async countUnread(userId: string): Promise<number> {
    return await this.count({
      where: { recipient_id: userId, isRead: false },
    });
  }
}
