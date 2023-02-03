"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBuffer = void 0;
function toBuffer(ab) {
    var buf = Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}
exports.toBuffer = toBuffer;
//# sourceMappingURL=helpers.js.map