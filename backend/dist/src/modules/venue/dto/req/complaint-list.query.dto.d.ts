import { ComplaintStatusEnum } from '../../../../database/entities/enums/complaint-status.enum';
import { ComplaintTypeEnum } from '../../../../database/entities/enums/complaint-type.enum';
export declare class ComplaintListQueryDto {
    limit?: number;
    offset?: number;
    status?: ComplaintStatusEnum;
    type?: ComplaintTypeEnum;
    from?: string;
    to?: string;
    get fromDate(): Date | undefined;
    get toDate(): Date | undefined;
}
