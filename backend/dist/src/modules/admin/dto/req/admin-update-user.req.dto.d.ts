import { RoleUserEnum } from '../../../../database/entities/enums/role.enum';
export declare class AdminUpdateUserReqDto {
    name?: string;
    bio?: string;
    image?: string;
    role?: RoleUserEnum[];
}
