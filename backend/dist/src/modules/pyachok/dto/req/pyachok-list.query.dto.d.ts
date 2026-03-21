import { PyachokStatusEnum } from '../../enums/pyachok-status.enum';
export declare class PyachokListQueryDto {
    status?: PyachokStatusEnum;
    date?: string;
    page?: number;
    limit?: number;
}
