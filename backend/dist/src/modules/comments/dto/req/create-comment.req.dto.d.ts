import { BaseCommentReqDto } from './base-comment.req.dto';
declare const CreateCommentReqDto_base: import("@nestjs/common").Type<Pick<BaseCommentReqDto, "title" | "rating" | "body" | "recommendation" | "image_check">>;
export declare class CreateCommentReqDto extends CreateCommentReqDto_base {
}
export {};
