import { DataSource, Repository } from 'typeorm';
import { TagEntity } from '../../../database/entities/tag.entity';
export declare class TagRepository extends Repository<TagEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getPopular(): Promise<TagEntity[]>;
}
