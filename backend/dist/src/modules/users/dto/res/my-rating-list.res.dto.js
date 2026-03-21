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
exports.MyRatingListResDto = exports.VenueWithMyRatingItemResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const venue_list_item_res_dto_1 = require("../../../venue/dto/res/venue-list-item.res.dto");
class VenueWithMyRatingItemResDto extends venue_list_item_res_dto_1.VenueListItemResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { myRating: { required: true, type: () => Number } };
    }
}
exports.VenueWithMyRatingItemResDto = VenueWithMyRatingItemResDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8 }),
    __metadata("design:type", Number)
], VenueWithMyRatingItemResDto.prototype, "myRating", void 0);
class MyRatingListResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("./my-rating-list.res.dto").VenueWithMyRatingItemResDto] }, total: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, offset: { required: true, type: () => Number } };
    }
}
exports.MyRatingListResDto = MyRatingListResDto;
//# sourceMappingURL=my-rating-list.res.dto.js.map