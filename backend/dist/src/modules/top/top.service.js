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
exports.TopService = void 0;
const common_1 = require("@nestjs/common");
const top_repository_1 = require("../repository/services/top.repository");
const venue_mapper_1 = require("../venue/services/venue.mapper");
let TopService = class TopService {
    constructor(topRepository) {
        this.topRepository = topRepository;
    }
    async getCategories() {
        const categories = await this.topRepository.getActiveCategories();
        return categories.map((c) => this.mapCategory(c));
    }
    async getCategoryBySlug(slug) {
        const category = await this.topRepository.getCategoryBySlug(slug);
        if (!category || !category.isActive) {
            throw new common_1.NotFoundException('Top category not found');
        }
        const venues = await this.topRepository.getCategoryVenuesPublic(category.id);
        return {
            category: this.mapCategory(category),
            venues: venues.map((v) => venue_mapper_1.VenueMapper.toResponseDTO(v)),
        };
    }
    mapCategory(entity) {
        return {
            id: entity.id,
            title: entity.title,
            slug: entity.slug,
            isActive: entity.isActive,
            order: entity.order,
        };
    }
};
exports.TopService = TopService;
exports.TopService = TopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [top_repository_1.TopRepository])
], TopService);
//# sourceMappingURL=top.service.js.map