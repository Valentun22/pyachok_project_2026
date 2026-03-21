import { EmailService } from 'src/modules/email/services/email.service';
import { UserRepository } from 'src/modules/repository/services/user.repository';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { PyachokRepository } from '../../repository/services/pyachok.repository';
import { VenueRepository } from '../../repository/services/venue.repository';
import { CreatePyachokReqDto } from '../dto/req/create-pyachok.req.dto';
import { PyachokListQueryDto } from '../dto/req/pyachok-list.query.dto';
import { PyachokStatusEnum } from '../enums/pyachok-status.enum';
export declare class PyachokService {
    private readonly pyachokRepo;
    private readonly venueRepo;
    private readonly userRepo;
    private readonly emailService;
    constructor(pyachokRepo: PyachokRepository, venueRepo: VenueRepository, userRepo: UserRepository, emailService: EmailService);
    private getRoles;
    private hasRole;
    private assertVenueManageAccess;
    private assertPyachokVenueAccess;
    getOpenFeed(query: PyachokListQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        items: import("../../../database/entities/pyachok.entity").PyachokEntity[];
    }>;
    getVenuePublicList(venueId: string, query: PyachokListQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        items: import("../../../database/entities/pyachok.entity").PyachokEntity[];
    }>;
    create(userId: string, venueId: string, dto: CreatePyachokReqDto): Promise<{
        user_id: string;
        venue_id: string;
        date: string;
        time: string;
        purpose: string;
        message: string;
        peopleCount: number;
        genderPreference: import("../enums/pyachok-gender.enum").PyachokGenderEnum;
        payer: import("../enums/pyachok-payer.enum").PyachokPayerEnum;
        expectedBudget: number;
        status: PyachokStatusEnum.OPEN;
    } & import("../../../database/entities/pyachok.entity").PyachokEntity>;
    getMy(userId: string, query: PyachokListQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        items: import("../../../database/entities/pyachok.entity").PyachokEntity[];
    }>;
    updateMy(userId: string, id: string, dto: CreatePyachokReqDto): Promise<import("../../../database/entities/pyachok.entity").PyachokEntity>;
    closeMy(userId: string, id: string): Promise<import("../../../database/entities/pyachok.entity").PyachokEntity>;
    closeAny(user: IUserData, id: string): Promise<import("../../../database/entities/pyachok.entity").PyachokEntity>;
    deleteMy(userId: string, id: string): Promise<{
        deleted: boolean;
    }>;
    deleteAny(user: IUserData, id: string): Promise<{
        deleted: boolean;
    }>;
    getVenueManageList(user: IUserData, venueId: string, query: PyachokListQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        items: import("../../../database/entities/pyachok.entity").PyachokEntity[];
    }>;
}
