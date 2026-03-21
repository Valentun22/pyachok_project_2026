"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformHelper = void 0;
class TransformHelper {
    static trim({ value }) {
        return value ? value.trim() : value;
    }
    static trimArray({ value }) {
        return value ? value.map((item) => item.trim()) : value;
    }
    static toLowerCase({ value }) {
        return value ? value.toLowerCase() : value;
    }
    static toUpperCase({ value }) {
        return value ? value.toUpperCase() : value;
    }
    static uniqueItems({ value }) {
        return value ? Array.from(new Set(value)) : value;
    }
    static toLowerCaseArray({ value }) {
        return value ? value.map((item) => item.toLowerCase()) : value;
    }
    static toArray({ value }) {
        if (value === undefined || value === null)
            return value;
        if (Array.isArray(value))
            return value;
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((v) => v.trim())
                .filter(Boolean);
        }
        return [value];
    }
}
exports.TransformHelper = TransformHelper;
//# sourceMappingURL=transform.helper.js.map