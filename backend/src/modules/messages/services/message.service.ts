import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { MessageEntity } from '../../../database/entities/message.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { MessageRepository } from '../../repository/services/message.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { SendMessageReqDto } from '../dto/req/send-message.req.dto';
import { MessageListResDto, MessageResDto } from '../dto/res/message.res.dto';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepo: MessageRepository,
    private readonly userRepo: UserRepository,
  ) {}

  private toDto(msg: MessageEntity): MessageResDto {
    return {
      id: msg.id,
      text: msg.text,
      isRead: msg.isRead,
      created: msg.created,
      sender: msg.sender
        ? { id: msg.sender.id, name: msg.sender.name, image: msg.sender.image }
        : undefined,
      recipient: msg.recipient
        ? {
            id: msg.recipient.id,
            name: msg.recipient.name,
            image: msg.recipient.image,
          }
        : undefined,
      pyachok: msg.pyachok
        ? {
            id: msg.pyachok.id,
            date: msg.pyachok.date,
            time: msg.pyachok.time,
            purpose: msg.pyachok.purpose,
            venue: msg.pyachok.venue
              ? { id: msg.pyachok.venue.id, name: msg.pyachok.venue.name }
              : undefined,
          }
        : undefined,
    };
  }

  public async send(
    sender: IUserData,
    recipientId: string,
    dto: SendMessageReqDto,
  ): Promise<MessageResDto> {
    if (sender.userId === recipientId) {
      throw new ForbiddenException('Cannot send message to yourself');
    }

    const recipient = await this.userRepo.findOne({
      where: { id: recipientId },
      select: ['id'],
    });
    if (!recipient) throw new NotFoundException('Recipient not found');

    const entity = this.messageRepo.create({
      text: dto.text,
      sender_id: sender.userId,
      recipient_id: recipientId,
      pyachok_id: dto.pyachokId ?? null,
    } as MessageEntity);

    const saved = await this.messageRepo.save(entity);

    const full = await this.messageRepo.findOne({
      where: { id: saved.id },
      relations: ['sender', 'recipient', 'pyachok', 'pyachok.venue'],
    });

    return this.toDto(full);
  }

  public async getInbox(
    user: IUserData,
    limit = 20,
    offset = 0,
  ): Promise<MessageListResDto> {
    const [items, total] = await this.messageRepo.getInbox(
      user.userId,
      limit,
      offset,
    );
    const unread = await this.messageRepo.countUnread(user.userId);
    return { data: items.map((m) => this.toDto(m)), total, unread };
  }

  public async getSent(
    user: IUserData,
    limit = 20,
    offset = 0,
  ): Promise<MessageListResDto> {
    const [items, total] = await this.messageRepo.getSent(
      user.userId,
      limit,
      offset,
    );
    return { data: items.map((m) => this.toDto(m)), total, unread: 0 };
  }

  public async markRead(user: IUserData, messageId: string): Promise<void> {
    const msg = await this.messageRepo.findOne({
      where: { id: messageId },
      select: ['id', 'recipient_id', 'isRead'],
    });
    if (!msg) throw new NotFoundException('Message not found');
    if (msg.recipient_id !== user.userId) throw new ForbiddenException();
    if (!msg.isRead) {
      await this.messageRepo.update(messageId, { isRead: true });
    }
  }

  public async markAllRead(user: IUserData): Promise<void> {
    await this.messageRepo.update(
      { recipient_id: user.userId, isRead: false },
      { isRead: true },
    );
  }

  public async deleteMessage(
    user: IUserData,
    messageId: string,
  ): Promise<void> {
    const msg = await this.messageRepo.findOne({
      where: { id: messageId },
      select: ['id', 'sender_id', 'recipient_id'],
    });
    if (!msg) throw new NotFoundException('Message not found');
    if (msg.sender_id !== user.userId && msg.recipient_id !== user.userId) {
      throw new ForbiddenException();
    }
    await this.messageRepo.delete({ id: messageId });
  }

  public async countUnread(user: IUserData): Promise<{ count: number }> {
    const count = await this.messageRepo.countUnread(user.userId);
    return { count };
  }
}
