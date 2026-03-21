import { DataSource, Repository } from 'typeorm';
import { VenueViewEntity } from '../../../database/entities/venue-view.entity';
export declare class VenueViewRepository extends Repository<VenueViewEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    logView(params: {
        venueId: string;
        userId?: string;
        ip?: string;
        userAgent?: string;
    }): Promise<void>;
    getViewsSummary(venueId: string, from?: Date, to?: Date): Promise<{
        total: number;
        uniqueUsers: number;
        uniqueIps: number;
    }>;
    getViewsTimeSeries(venueId: string, bucket: 'hour' | 'day', from?: Date, to?: Date): Promise<Array<{
        bucket: string;
        count: number;
    }>>;
}
