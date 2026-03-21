"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageListResDto = exports.MessageResDto = void 0;
const openapi = require("@nestjs/swagger");
class MessageResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, text: { required: true, type: () => String }, isRead: { required: true, type: () => Boolean }, created: { required: true, type: () => Date }, pyachok: { required: false, type: () => ({ id: { required: true, type: () => String }, date: { required: true, type: () => String }, time: { required: true, type: () => String }, purpose: { required: false, type: () => String }, venue: { required: false, type: () => ({ id: { required: true, type: () => String }, name: { required: true, type: () => String } }) } }) }, sender: { required: false, type: () => ({ id: { required: true, type: () => String }, name: { required: false, type: () => String }, image: { required: false, type: () => String } }) }, recipient: { required: false, type: () => ({ id: { required: true, type: () => String }, name: { required: false, type: () => String }, image: { required: false, type: () => String } }) } };
    }
}
exports.MessageResDto = MessageResDto;
class MessageListResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("./message.res.dto").MessageResDto] }, total: { required: true, type: () => Number }, unread: { required: true, type: () => Number } };
    }
}
exports.MessageListResDto = MessageListResDto;
//# sourceMappingURL=message.res.dto.js.map