"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const message_repository_1 = require("../../repository/services/message.repository");
const user_repository_1 = require("../../repository/services/user.repository");
let MessageService = class MessageService {
    constructor(messageRepo, userRepo) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
    }
    toDto(msg) {
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
    async send(sender, recipientId, dto) {
        if (sender.userId === recipientId) {
            throw new common_1.ForbiddenException('Cannot send message to yourself');
        }
        const recipient = await this.userRepo.findOne({
            where: { id: recipientId },
            select: ['id'],
        });
        if (!recipient)
            throw new common_1.NotFoundException('Recipient not found');
        const entity = this.messageRepo.create({
            text: dto.text,
            sender_id: sender.userId,
            recipient_id: recipientId,
            pyachok_id: dto.pyachokId ?? null,
        });
        const saved = await this.messageRepo.save(entity);
        const full = await this.messageRepo.findOne({
            where: { id: saved.id },
            relations: ['sender', 'recipient', 'pyachok', 'pyachok.venue'],
        });
        return this.toDto(full);
    }
    async getInbox(user, limit = 20, offset = 0) {
        const [items, total] = await this.messageRepo.getInbox(user.userId, limit, offset);
        const unread = await this.messageRepo.countUnread(user.userId);
        return { data: items.map((m) => this.toDto(m)), total, unread };
    }
    async getSent(user, limit = 20, offset = 0) {
        const [items, total] = await this.messageRepo.getSent(user.userId, limit, offset);
        return { data: items.map((m) => this.toDto(m)), total, unread: 0 };
    }
    async markRead(user, messageId) {
        const msg = await this.messageRepo.findOne({
            where: { id: messageId },
            select: ['id', 'recipient_id', 'isRead'],
        });
        if (!msg)
            throw new common_1.NotFoundException('Message not found');
        if (msg.recipient_id !== user.userId)
            throw new common_1.ForbiddenException();
        if (!msg.isRead) {
            await this.messageRepo.update(messageId, { isRead: true });
        }
    }
    async markAllRead(user) {
        await this.messageRepo.update({ recipient_id: user.userId, isRead: false }, { isRead: true });
    }
    async deleteMessage(user, messageId) {
        const msg = await this.messageRepo.findOne({
            where: { id: messageId },
            select: ['id', 'sender_id', 'recipient_id'],
        });
        if (!msg)
            throw new common_1.NotFoundException('Message not found');
        if (msg.sender_id !== user.userId && msg.recipient_id !== user.userId) {
            throw new common_1.ForbiddenException();
        }
        await this.messageRepo.delete({ id: messageId });
    }
    async countUnread(user) {
        const count = await this.messageRepo.countUnread(user.userId);
        return { count };
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository,
        user_repository_1.UserRepository])
], MessageService);
//# sourceMappingURL=message.service.js.map