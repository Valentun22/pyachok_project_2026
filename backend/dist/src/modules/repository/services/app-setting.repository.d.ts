import { DataSource, Repository } from 'typeorm';
import { AppSettingEntity } from '../../../database/entities/app-setting.entity';
export declare class AppSettingRepository extends Repository<AppSettingEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getAll(): Promise<Record<string, string>>;
    upsertSetting(key: string, value: string): Promise<void>;
    upsertManySettings(data: Record<string, string>): Promise<void>;
}
