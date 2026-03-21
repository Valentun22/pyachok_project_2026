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
exports.PyachokService = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("../../email/services/email.service");
const user_repository_1 = require("../../repository/services/user.repository");
const role_enum_1 = require("../../../database/entities/enums/role.enum");
const pyachok_repository_1 = require("../../repository/services/pyachok.repository");
const venue_repository_1 = require("../../repository/services/venue.repository");
const pyachok_status_enum_1 = require("../enums/pyachok-status.enum");
let PyachokService = class PyachokService {
    constructor(pyachokRepo, venueRepo, userRepo, emailService) {
        this.pyachokRepo = pyachokRepo;
        this.venueRepo = venueRepo;
        this.userRepo = userRepo;
        this.emailService = emailService;
    }
    getRoles(user) {
        const anyUser = user;
        return (anyUser.roles || anyUser.role || []);
    }
    hasRole(user, role) {
        return this.getRoles(user).includes(role);
    }
    async assertVenueManageAccess(user, venueId) {
        const venue = await this.venueRepo.findOne({
            where: { id: venueId },
            select: ['id', 'user_id', 'email', 'name'],
        });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        if (this.hasRole(user, role_enum_1.RoleUserEnum.SUPERADMIN))
            return venue;
        const isOwner = venue.user_id === user.userId;
        const isVenueAdmin = this.hasRole(user, role_enum_1.RoleUserEnum.VENUE_ADMIN);
        if (!isOwner && !isVenueAdmin) {
            throw new common_1.ForbiddenException('No permissions for this venue');
        }
        return venue;
    }
    async assertPyachokVenueAccess(user, pyachokId) {
        const item = await this.pyachokRepo.findOne({
            where: { id: pyachokId },
            relations: ['venue'],
        });
        if (!item)
            throw new common_1.NotFoundException('Request not found');
        if (this.hasRole(user, role_enum_1.RoleUserEnum.SUPERADMIN))
            return item;
        const isAuthor = item.user_id === user.userId;
        const isVenueOwner = item.venue?.user_id === user.userId;
        const isVenueAdmin = this.hasRole(user, role_enum_1.RoleUserEnum.VENUE_ADMIN);
        if (!isAuthor && !isVenueOwner && !isVenueAdmin) {
            throw new common_1.ForbiddenException('No permissions');
        }
        return item;
    }
    async getOpenFeed(query) {
        const [items, total] = await this.pyachokRepo.getOpenFeed(query);
        return {
            total,
            page: query.page ?? 1,
            limit: query.limit ?? 20,
            items,
        };
    }
    async getVenuePublicList(venueId, query) {
        const fixed = {
            ...query,
            status: pyachok_status_enum_1.PyachokStatusEnum.OPEN,
        };
        const [items, total] = await this.pyachokRepo.getVenuePublicList(venueId, fixed);
        return {
            total,
            page: fixed.page ?? 1,
            limit: fixed.limit ?? 20,
            items,
        };
    }
    async create(userId, venueId, dto) {
        const venue = await this.venueRepo.findOne({
            where: { id: venueId },
            select: ['id', 'user_id', 'email', 'name', 'city', 'address'],
        });
        if (!venue)
            throw new common_1.NotFoundException('Venue not found');
        const created = await this.pyachokRepo.save({
            user_id: userId,
            venue_id: venueId,
            date: dto.date,
            time: dto.time,
            purpose: dto.purpose,
            message: dto.message,
            peopleCount: dto.peopleCount,
            genderPreference: dto.genderPreference,
            payer: dto.payer,
            expectedBudget: dto.expectedBudget,
            status: pyachok_status_enum_1.PyachokStatusEnum.OPEN,
        });
        let toEmail = venue.email ?? null;
        if (!toEmail) {
            const owner = await this.userRepo.findOne({
                where: { id: venue.user_id },
                select: ['id', 'email', 'name'],
            });
            toEmail = owner?.email ?? null;
        }
        if (toEmail) {
            const subject = `Пиячок: нова заявка для "${venue.name}"`;
            const text = [
                `Заклад: ${venue.name}`,
                `Адреса: ${venue.city || ''} ${venue.address || ''}`.trim(),
                `Дата: ${dto.date}`,
                `Час: ${dto.time}`,
                dto.peopleCount != null ? `К-сть людей: ${dto.peopleCount}` : null,
                dto.genderPreference
                    ? `Стать (побажання): ${dto.genderPreference}`
                    : null,
                dto.payer ? `Хто оплачує: ${dto.payer}` : null,
                dto.expectedBudget != null ? `Бюджет: ${dto.expectedBudget}` : null,
                dto.purpose ? `Мета: ${dto.purpose}` : null,
                dto.message ? `Повідомлення власнику: ${dto.message}` : null,
                '',
                `ID заявки: ${created.id}`,
            ]
                .filter(Boolean)
                .join('\n');
            await this.emailService.sendMail(toEmail, subject, text);
        }
        return created;
    }
    async getMy(userId, query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        const qb = this.pyachokRepo.createQueryBuilder('p');
        qb.leftJoinAndSelect('p.venue', 'venue');
        qb.andWhere('p.user_id = :userId', { userId });
        if (query.status) {
            qb.andWhere('p.status = :status', { status: query.status });
        }
        if (query.date) {
            qb.andWhere('p.date = :date', { date: query.date });
        }
        qb.orderBy('p.created', 'DESC');
        qb.take(limit);
        qb.skip(skip);
        const [items, total] = await qb.getManyAndCount();
        return { total, page, limit, items };
    }
    async updateMy(userId, id, dto) {
        const item = await this.pyachokRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Request not found');
        if (item.user_id !== userId)
            throw new common_1.ForbiddenException('Not your request');
        if (dto.date)
            item.date = dto.date;
        if (dto.time)
            item.time = dto.time;
        if (dto.purpose !== undefined)
            item.purpose = dto.purpose?.trim() || undefined;
        if (dto.message !== undefined)
            item.message = dto.message?.trim() || undefined;
        if (dto.peopleCount !== undefined)
            item.peopleCount = dto.peopleCount;
        if (dto.genderPreference !== undefined)
            item.genderPreference = dto.genderPreference;
        if (dto.payer !== undefined)
            item.payer = dto.payer;
        if (dto.expectedBudget !== undefined)
            item.expectedBudget = dto.expectedBudget;
        return await this.pyachokRepo.save(item);
    }
    async closeMy(userId, id) {
        const item = await this.pyachokRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Request not found');
        if (item.user_id !== userId) {
            throw new common_1.ForbiddenException('Not your request');
        }
        if (item.status === pyachok_status_enum_1.PyachokStatusEnum.CLOSED)
            return item;
        item.status = pyachok_status_enum_1.PyachokStatusEnum.CLOSED;
        return await this.pyachokRepo.save(item);
    }
    async closeAny(user, id) {
        const item = await this.assertPyachokVenueAccess(user, id);
        if (item.status === pyachok_status_enum_1.PyachokStatusEnum.CLOSED)
            return item;
        item.status = pyachok_status_enum_1.PyachokStatusEnum.CLOSED;
        return await this.pyachokRepo.save(item);
    }
    async deleteMy(userId, id) {
        const item = await this.pyachokRepo.findOne({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Request not found');
        if (item.user_id !== userId) {
            throw new common_1.ForbiddenException('Not your request');
        }
        await this.pyachokRepo.remove(item);
        return { deleted: true };
    }
    async deleteAny(user, id) {
        const item = await this.assertPyachokVenueAccess(user, id);
        await this.pyachokRepo.remove(item);
        return { deleted: true };
    }
    async getVenueManageList(user, venueId, query) {
        await this.assertVenueManageAccess(user, venueId);
        const [items, total] = await this.pyachokRepo.getVenueManageList(venueId, query);
        return {
            total,
            page: query.page ?? 1,
            limit: query.limit ?? 20,
            items,
        };
    }
};
exports.PyachokService = PyachokService;
exports.PyachokService = PyachokService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pyachok_repository_1.PyachokRepository,
        venue_repository_1.VenueRepository,
        user_repository_1.UserRepository,
        email_service_1.EmailService])
], PyachokService);
//# sourceMappingURL=pyachok.service.js.map