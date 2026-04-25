export interface IFollowUser {
    id: string;
    name?: string;
    image?: string;
    isCritic?: boolean;
}

export interface IFavoriteVenue {
    id: string;
    name: string;
    avatarVenue?: string;
    city?: string;
}

export interface IMyComment {
    id: string;
    title: string;
    body?: string;
    rating: number;
    created: string;
    venue?: { id: string; name: string };
}

export interface IMyRating {
    id: string;
    rating: number;
    created: string;
    venue?: { id: string; name: string; avatarVenue?: string };
}

export interface IPyachokRow {
    id: string;
    date: string;
    time: string;
    purpose?: string;
    status: string;
    venue?: { id: string; name: string };
}

export interface IMyVenue {
    id: string;
    name: string;
    avatarVenue?: string;
    city?: string;
    isActive?: boolean;
    isModerated?: boolean;
}

export interface IFullUser {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    bio?: string;
    isCritic?: boolean;
    role?: string[];
    birthdate?: string;
    city?: string;
    gender?: string;
    instagram?: string;
    interests?: string;
}

