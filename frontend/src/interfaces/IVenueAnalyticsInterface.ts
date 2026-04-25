export interface ITimePoint {
    bucket: string;
    date?: string;
    count: number;
}

export interface ISummary {
    total: number;
    uniqueVisitors?: number;
    avgPerDay?: number;
}