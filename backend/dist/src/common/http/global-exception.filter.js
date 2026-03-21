"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const logger_service_1 = require("../../modules/logger/logger.service");
const db_query_failed_filter_1 = require("./db-query-failed.filter");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status;
        let messages;
        if (exception instanceof common_1.BadRequestException) {
            status = exception.getStatus();
            messages = exception.getResponse().message;
        }
        else if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            messages = exception.message;
        }
        else if (exception instanceof typeorm_1.QueryFailedError) {
            const error = db_query_failed_filter_1.DbQueryFailedFilter.filter(exception);
            status = error.status;
            messages = error.message;
        }
        else {
            status = 500;
            messages = 'Internal server error';
        }
        this.logger.error(exception);
        messages = Array.isArray(messages) ? messages : [messages];
        response.status(status).json({
            statusCode: status,
            messages,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map