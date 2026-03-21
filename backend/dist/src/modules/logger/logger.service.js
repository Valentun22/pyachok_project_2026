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
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Sentry = require("@sentry/nestjs");
const profiling_node_1 = require("@sentry/profiling-node");
let LoggerService = class LoggerService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger();
        const sentryConfig = this.configService.get('sentry');
        this.isLocal = sentryConfig.env === 'local';
        Sentry.init({
            dsn: sentryConfig.dsn,
            integrations: [
                (0, profiling_node_1.nodeProfilingIntegration)(),
                Sentry.anrIntegration({ captureStackTrace: true }),
            ],
            debug: sentryConfig.debug,
            tracesSampleRate: 1.0,
            profilesSampleRate: 1.0,
        });
    }
    log(message) {
        if (this.isLocal) {
            this.logger.log(message);
        }
        else {
            Sentry.captureMessage(message, 'log');
        }
    }
    info(message) {
        if (this.isLocal) {
            this.logger.log(message);
        }
        else {
            Sentry.captureMessage(message, 'info');
        }
    }
    warn(message) {
        if (this.isLocal) {
            this.logger.log(message);
        }
        else {
            Sentry.captureMessage(message, 'warning');
        }
    }
    error(error) {
        if (this.isLocal) {
            this.logger.error(error, error.stack);
        }
        else {
            Sentry.captureException(error, { level: 'error' });
        }
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LoggerService);
//# sourceMappingURL=logger.service.js.map