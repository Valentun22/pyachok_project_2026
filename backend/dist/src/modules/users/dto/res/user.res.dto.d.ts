import { BaseUserResDto } from './base-user.res.dto';
declare const UserResDto_base: import("@nestjs/common").Type<Pick<BaseUserResDto, "id" | "name" | "email" | "image" | "bio" | "birthdate" | "city" | "gender" | "instagram" | "interests" | "role" | "isFollowed" | "isCritic">>;
export declare class UserResDto extends UserResDto_base {
}
export {};
