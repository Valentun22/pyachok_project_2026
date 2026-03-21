import { DataSource, Repository } from 'typeorm';
import { LikeEntity } from '../../../database/entities/like.entity';
export declare class LikeRepository extends Repository<LikeEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
}
