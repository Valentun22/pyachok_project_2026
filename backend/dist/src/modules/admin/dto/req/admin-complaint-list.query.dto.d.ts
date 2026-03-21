import { ComplaintStatusEnum } from '../../../../database/entities/enums/complaint-status.enum';
import { ComplaintTypeEnum } from '../../../../database/entities/enums/complaint-type.enum';
export declare class AdminComplaintListQueryDto {
    limit?: number;
    offset?: number;
    venueId?: string;
    userId?: string;
    status?: ComplaintStatusEnum;
    type?: ComplaintTypeEnum;
    from?: string;
    to?: string;
    get fromDate(): Date | undefined;
    get toDate(): Date | undefined;
}
