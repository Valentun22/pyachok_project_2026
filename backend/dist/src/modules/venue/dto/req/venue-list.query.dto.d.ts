import { VenueCategoryEnum } from '../../../../database/entities/enums/place-type.enum';
export declare enum VenueSortByEnum {
    RATING = "rating",
    AVERAGE_CHECK = "averageCheck",
    CREATED = "created",
    NAME = "name"
}
export declare enum SortOrderEnum {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class VenueListQueryDto {
    limit?: number;
    offset?: number;
    tag?: string;
    likes?: string;
    search?: string;
    averageCheckFrom?: number;
    averageCheckTo?: number;
    ratingFrom?: number;
    ratingTo?: number;
    categories?: VenueCategoryEnum[];
    hasWiFi?: boolean;
    hasParking?: boolean;
    liveMusic?: boolean;
    petFriendly?: boolean;
    hasTerrace?: boolean;
    smokingAllowed?: boolean;
    cardPayment?: boolean;
    sortBy?: VenueSortByEnum;
    sortOrder?: SortOrderEnum;
    city?: string;
    ownerId?: string;
}
