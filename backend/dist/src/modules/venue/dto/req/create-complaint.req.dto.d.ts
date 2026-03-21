import { ComplaintTypeEnum } from '../../../../database/entities/enums/complaint-type.enum';
export declare class CreateComplaintReqDto {
    type?: ComplaintTypeEnum;
    targetId?: string;
    reason: string;
}
