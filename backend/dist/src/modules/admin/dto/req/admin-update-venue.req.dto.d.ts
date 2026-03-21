import { VenueCategoryEnum } from '../../../../database/entities/enums/place-type.enum';
declare class WorkingHoursDto {
    mon?: string;
    tue?: string;
    wed?: string;
    thu?: string;
    fri?: string;
    sat?: string;
    sun?: string;
}
declare class SocialsDto {
    instagram?: string;
    facebook?: string;
    telegram?: string;
}
export declare class AdminUpdateVenueReqDto {
    name?: string;
    avatarVenue?: string;
    logoVenue?: string;
    image?: string[];
    menu?: string;
    averageCheck?: number;
    workingHours?: WorkingHoursDto;
    city?: string;
    address?: string;
    categories?: VenueCategoryEnum[];
    isModerated?: boolean;
    isActive?: boolean;
    phone?: string;
    email?: string;
    website?: string;
    socials?: SocialsDto;
    description?: string;
    hasWiFi?: boolean;
    hasParking?: boolean;
    liveMusic?: boolean;
    petFriendly?: boolean;
    hasTerrace?: boolean;
    smokingAllowed?: boolean;
    cardPayment?: boolean;
    tags?: string[];
}
export {};
