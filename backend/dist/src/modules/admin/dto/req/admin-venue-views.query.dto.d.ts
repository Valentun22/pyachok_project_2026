export declare class AdminVenueViewsQueryDto {
    from?: string;
    to?: string;
    bucket?: 'day' | 'hour';
    get fromDate(): Date | undefined;
    get toDate(): Date | undefined;
}
