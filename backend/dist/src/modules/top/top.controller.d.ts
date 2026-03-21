import { TopCategoryResDto } from './dto/res/top-category.res.dto';
import { TopCategoryWithVenuesResDto } from './dto/res/top-category-with-venues.res.dto';
import { TopService } from './top.service';
export declare class TopController {
    private readonly topService;
    constructor(topService: TopService);
    getCategories(): Promise<TopCategoryResDto[]>;
    getCategoryBySlug(slug: string): Promise<TopCategoryWithVenuesResDto>;
}
