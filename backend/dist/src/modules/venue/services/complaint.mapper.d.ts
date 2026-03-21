import { ComplaintEntity } from '../../../database/entities/complaint.entity';
import { ComplaintResDto } from '../dto/res/complaint.res.dto';
import { ComplaintListResDto } from '../dto/res/complaint-list.res.dto';
export declare class ComplaintMapper {
    static toResponseDTO(entity: ComplaintEntity): ComplaintResDto;
    static toListResponseDTO(data: ComplaintEntity[], total: number, limit: number, offset: number): ComplaintListResDto;
}
