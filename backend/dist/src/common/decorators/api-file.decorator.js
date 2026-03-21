"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFile = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiFile = (fileName, isArray = true, isRequired = true) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: isRequired ? [fileName] : [],
            properties: {
                [fileName]: isArray
                    ? {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                    }
                    : {
                        type: 'string',
                        format: 'binary',
                    },
            },
        },
    }));
};
exports.ApiFile = ApiFile;
//# sourceMappingURL=api-file.decorator.js.map