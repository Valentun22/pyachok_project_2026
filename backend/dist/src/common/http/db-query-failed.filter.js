"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbQueryFailedFilter = void 0;
const common_1 = require("@nestjs/common");
class DbQueryFailedFilter {
    static filter(exception) {
        let status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
        let message = exception.message;
        const code = exception.code;
        if (exception.code === '23505') {
            const detail = exception.detail;
            const key = detail
                .match(/(?<=\().+?(?=\)=)/g)[0]
                .split(',')[0]
                .replace(/[^a-z ]/gim, '');
            const value = detail.match(/(?<==\().+?(?=\))/g)[0].split(',')[0];
            status = common_1.HttpStatus.CONFLICT;
            message = `${key} ${value} already exists`;
        }
        return { status, message, code };
    }
}
exports.DbQueryFailedFilter = DbQueryFailedFilter;
//# sourceMappingURL=db-query-failed.filter.js.map