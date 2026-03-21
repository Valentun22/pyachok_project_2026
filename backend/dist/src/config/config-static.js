"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigStaticService = void 0;
const process = require("node:process");
const dotenv = require("dotenv");
const configuration_1 = require("./configuration");
class ConfigStatic {
    get() {
        return (0, configuration_1.default)();
    }
}
const env = process.env.ENVIROMENT || 'local';
dotenv.config({ path: `environments/${env}.env` });
const ConfigStaticService = new ConfigStatic();
exports.ConfigStaticService = ConfigStaticService;
//# sourceMappingURL=config-static.js.map