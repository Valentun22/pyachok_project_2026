import { BaseUserReqDto } from './base-user.req.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Pick<BaseUserReqDto, "name" | "image" | "bio" | "birthdate" | "city" | "gender" | "instagram" | "interests">>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
