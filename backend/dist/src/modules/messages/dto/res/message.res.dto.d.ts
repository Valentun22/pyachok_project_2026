export declare class MessageResDto {
    id: string;
    text: string;
    isRead: boolean;
    created: Date;
    pyachok?: {
        id: string;
        date: string;
        time: string;
        purpose?: string;
        venue?: {
            id: string;
            name: string;
        };
    };
    sender?: {
        id: string;
        name?: string;
        image?: string;
    };
    recipient?: {
        id: string;
        name?: string;
        image?: string;
    };
}
export declare class MessageListResDto {
    data: MessageResDto[];
    total: number;
    unread: number;
}
