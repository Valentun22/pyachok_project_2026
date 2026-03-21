import { TagResDto } from './dto/res/tag.res.dto';
import { TagService } from './services/tag.service';
export declare class TagController {
    private readonly service;
    constructor(service: TagService);
    getPopular(): Promise<TagResDto[]>;
}
