import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../../database/entities/user.entity';
export declare class UserRepository extends Repository<UserEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findUserWithLikes(id: string): Promise<UserEntity>;
    getAdminList(limit: number, offset: number, search?: string): Promise<[UserEntity[], number]>;
}
