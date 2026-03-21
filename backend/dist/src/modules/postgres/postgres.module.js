"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresModule = void 0;
const path = require("node:path");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
let PostgresModule = class PostgresModule {
};
exports.PostgresModule = PostgresModule;
exports.PostgresModule = PostgresModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async (configService) => {
                    const config = configService.get('postgres');
                    return {
                        type: 'postgres',
                        host: config.host,
                        port: config.port,
                        username: config.user,
                        password: config.password,
                        database: config.dbName,
                        entities: [
                            path.join(process.cwd(), 'dist', 'src', 'database', 'entities', '*.entity.js'),
                        ],
                        migrations: [
                            path.join(process.cwd(), 'dist', 'src', 'database', 'migrations', '*.js'),
                        ],
                        migrationsRun: true,
                        synchronize: false,
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
    })
], PostgresModule);
//# sourceMappingURL=postgres.module.js.map