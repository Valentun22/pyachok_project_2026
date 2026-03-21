import { VenueCategoryEnum } from '../../../../database/entities/enums/place-type.enum';
import { UserResDto } from '../../../users/dto/res/user.res.dto';
declare class WorkingHoursResDto {
    mon?: string;
    tue?: string;
    wed?: string;
    thu?: string;
    fri?: string;
    sat?: string;
    sun?: string;
}
declare class SocialsResDto {
    instagram?: string;
    facebook?: string;
    telegram?: string;
}
export declare class BaseVenueResDto {
    id: string;
    created: Date;
    updated: Date;
    name: string;
    avatarVenue?: string;
    logoVenue?: string;
    image?: string[];
    menu?: string;
    averageCheck?: number;
    workingHours?: WorkingHoursResDto;
    city: string;
    address: string;
    categories?: VenueCategoryEnum[];
    isModerated: boolean;
    isActive: boolean;
    phone?: string;
    email?: string;
    website?: string;
    socials?: SocialsResDto;
    description: string;
    hasWiFi: boolean;
    hasParking: boolean;
    liveMusic: boolean;
    petFriendly: boolean;
    hasTerrace: boolean;
    smokingAllowed: boolean;
    cardPayment: boolean;
    ratingAvg?: number;
    ratingCount?: number;
    tags?: string[];
    isLiked: boolean;
    likesCount: number;
    user?: UserResDto;
    isFavorite: boolean;
}
export {};
