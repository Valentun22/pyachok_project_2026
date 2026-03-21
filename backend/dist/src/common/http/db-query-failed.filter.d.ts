import { HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
export declare class DbQueryFailedFilter {
    static filter(exception: QueryFailedError): {
        status: HttpStatus.CONFLICT | HttpStatus.UNPROCESSABLE_ENTITY;
        message: string;
        code: any;
    };
}
