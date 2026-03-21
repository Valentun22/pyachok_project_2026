import { DataSource, Repository } from 'typeorm';
import { ComplaintEntity } from '../../../database/entities/complaint.entity';
import { ComplaintListQueryDto } from '../../venue/dto/req/complaint-list.query.dto';
import { AdminComplaintListQueryDto } from '../../admin/dto/req/admin-complaint-list.query.dto';
export declare class ComplaintRepository extends Repository<ComplaintEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getListForVenue(venueId: string, query: ComplaintListQueryDto): Promise<[ComplaintEntity[], number]>;
    getAdminList(query: AdminComplaintListQueryDto): Promise<[ComplaintEntity[], number]>;
}
