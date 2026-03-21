"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("node:path");
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
const configuration_1 = require("./src/config/configuration");
if (!process.env.POSTGRES_HOST) {
    dotenv.config({ path: './environments/local.env' });
}
const databaseConfig = (0, configuration_1.default)().postgres;
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.dbName,
    entities: [
        path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
    ],
    migrations: [
        path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
    ],
    synchronize: false,
});
//# sourceMappingURL=ormconfig.js.map