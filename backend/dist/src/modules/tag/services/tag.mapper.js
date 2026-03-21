"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagMapper = void 0;
class TagMapper {
    static toResponseListDTO(entities) {
        return entities.map(this.toResponseDTO);
    }
    static toResponseDTO(entity) {
        return {
            name: entity.name,
            venueCount: entity.venueCount,
        };
    }
}
exports.TagMapper = TagMapper;
//# sourceMappingURL=tag.mapper.js.map