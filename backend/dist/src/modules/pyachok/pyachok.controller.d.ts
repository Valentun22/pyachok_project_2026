import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreatePyachokReqDto } from './dto/req/create-pyachok.req.dto';
import { PyachokListQueryDto } from './dto/req/pyachok-list.query.dto';
import { PyachokService } from './services/pyachok.service';
export declare class PyachokController {
    private readonly service;
    constructor(service: PyachokService);
    getOpenFeed(query: PyachokListQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        items: import("../../database/entities/pyachok.entity").PyachokEntity[];
    }>;
    getVenuePublicList(venueId: string, query: PyachokListQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        items: import("../../database/entities/pyachok.entity").PyachokEntity[];
    }>;
    create(venueId: string, user: IUserData, dto: CreatePyachokReqDto): Promise<{
        user_id: string;
        venue_id: string;
        date: string;
        time: string;
        purpose: string;
        message: string;
        peopleCount: number;
        genderPreference: import("./enums/pyachok-gender.enum").PyachokGenderEnum;
        payer: import("./enums/pyachok-payer.enum").PyachokPayerEnum;
        expectedBudget: number;
        status: import("./enums/pyachok-status.enum").PyachokStatusEnum.OPEN;
    } & import("../../database/entities/pyachok.entity").PyachokEntity>;
    getMy(user: IUserData, query: PyachokListQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        items: import("../../database/entities/pyachok.entity").PyachokEntity[];
    }>;
    updateMy(id: string, user: IUserData, dto: CreatePyachokReqDto): Promise<import("../../database/entities/pyachok.entity").PyachokEntity>;
    closeMy(id: string, user: IUserData): Promise<import("../../database/entities/pyachok.entity").PyachokEntity>;
    closeAny(id: string, user: IUserData): Promise<import("../../database/entities/pyachok.entity").PyachokEntity>;
    deleteMy(id: string, user: IUserData): Promise<{
        deleted: boolean;
    }>;
    deleteAny(id: string, user: IUserData): Promise<{
        deleted: boolean;
    }>;
    getVenueManageList(venueId: string, user: IUserData, query: PyachokListQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        items: import("../../database/entities/pyachok.entity").PyachokEntity[];
    }>;
}
