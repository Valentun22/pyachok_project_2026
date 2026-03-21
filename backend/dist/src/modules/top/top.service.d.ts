import { TopRepository } from '../repository/services/top.repository';
import { TopCategoryResDto } from './dto/res/top-category.res.dto';
import { TopCategoryWithVenuesResDto } from './dto/res/top-category-with-venues.res.dto';
export declare class TopService {
    private readonly topRepository;
    constructor(topRepository: TopRepository);
    getCategories(): Promise<TopCategoryResDto[]>;
    getCategoryBySlug(slug: string): Promise<TopCategoryWithVenuesResDto>;
    private mapCategory;
}
