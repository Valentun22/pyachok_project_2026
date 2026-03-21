import { BaseUserReqDto } from '../../../users/dto/req/base-user.req.dto';
declare const BaseAuthReqDto_base: import("@nestjs/common").Type<Pick<BaseUserReqDto, "name" | "email" | "image" | "bio" | "password">>;
export declare class BaseAuthReqDto extends BaseAuthReqDto_base {
    readonly deviceId: string;
}
export {};
