import { DataSource, Repository } from 'typeorm';
import { TopCategoryEntity } from '../../../database/entities/top-category.entity';
import { TopCategoryVenueEntity } from '../../../database/entities/top-category-venue.entity';
import { VenueEntity } from '../../../database/entities/venue.entity';
export declare class TopRepository {
    private readonly dataSource;
    readonly categories: Repository<TopCategoryEntity>;
    readonly items: Repository<TopCategoryVenueEntity>;
    constructor(dataSource: DataSource);
    getActiveCategories(): Promise<TopCategoryEntity[]>;
    getCategoryBySlug(slug: string): Promise<TopCategoryEntity | null>;
    getCategoryById(id: string): Promise<TopCategoryEntity | null>;
    getCategoryVenuesPublic(categoryId: string): Promise<VenueEntity[]>;
}
