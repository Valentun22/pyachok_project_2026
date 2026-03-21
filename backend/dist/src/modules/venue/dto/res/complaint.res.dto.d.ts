import { ComplaintStatusEnum } from '../../../../database/entities/enums/complaint-status.enum';
import { ComplaintTypeEnum } from '../../../../database/entities/enums/complaint-type.enum';
export declare class ComplaintUserPreviewDto {
    id: string;
    name: string;
    image?: string;
}
export declare class ComplaintVenuePreviewDto {
    id: string;
    name: string;
}
export declare class ComplaintResDto {
    id: string;
    venueId: string;
    userId: string;
    type: ComplaintTypeEnum;
    targetId?: string;
    reason: string;
    status: ComplaintStatusEnum;
    created: Date;
    user?: ComplaintUserPreviewDto;
    venue?: ComplaintVenuePreviewDto;
}
