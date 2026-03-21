import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UserResDto } from '../dto/res/user.res.dto';
export declare class UserMapper {
    static toResponseDTO(data: UserEntity, currentUserId?: string | null): UserResDto;
    static toIUserData(user: UserEntity, payload: IJwtPayload): IUserData;
}
