"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgeValid = AgeValid;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function AgeValid() {
    return (0, common_1.applyDecorators)((0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsInt)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Max)(120), (0, class_validator_1.Min)(15));
}
//# sourceMappingURL=age-valid.decorator.js.map