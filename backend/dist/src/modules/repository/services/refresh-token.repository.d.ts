import { DataSource, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../../../database/entities/refresh-token.entity';
export declare class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    isRefreshTokenExist(refreshToken: string): Promise<boolean>;
}
