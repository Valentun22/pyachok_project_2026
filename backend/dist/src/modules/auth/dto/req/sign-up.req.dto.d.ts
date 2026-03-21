import { BaseAuthReqDto } from './base-auth.req.dto';
declare const SignUpReqDto_base: import("@nestjs/common").Type<Pick<BaseAuthReqDto, "name" | "email" | "bio" | "deviceId" | "password">>;
export declare class SignUpReqDto extends SignUpReqDto_base {
}
export {};
