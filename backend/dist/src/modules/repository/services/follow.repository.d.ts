import { DataSource, Repository } from 'typeorm';
import { FollowEntity } from '../../../database/entities/follow.entity';
export declare class FollowRepository extends Repository<FollowEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
}
