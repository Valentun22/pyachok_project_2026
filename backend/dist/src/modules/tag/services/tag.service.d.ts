import { TagEntity } from '../../../database/entities/tag.entity';
import { TagRepository } from '../../repository/services/tag.repository';
export declare class TagService {
    private readonly tagRepository;
    constructor(tagRepository: TagRepository);
    getPopular(): Promise<TagEntity[]>;
}
