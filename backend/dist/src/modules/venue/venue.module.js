"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const email_module_1 = require("../email/email.module");
const file_storage_module_1 = require("../file-storage/file-storage.module");
const venue_service_1 = require("./services/venue.service");
const venue_controller_1 = require("./venue.controller");
let VenueModule = class VenueModule {
};
exports.VenueModule = VenueModule;
exports.VenueModule = VenueModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, email_module_1.EmailModule, file_storage_module_1.FileStorageModule],
        controllers: [venue_controller_1.VenueController],
        providers: [venue_service_1.VenueService],
        exports: [venue_service_1.VenueService],
    })
], VenueModule);
//# sourceMappingURL=venue.module.js.map