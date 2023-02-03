"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.H5PFindTheWordsContent = void 0;
var h5p_content_1 = require("./h5p-content");
var H5PFindTheWordsContent = /** @class */ (function (_super) {
    __extends(H5PFindTheWordsContent, _super);
    function H5PFindTheWordsContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskDescription = "";
        return _this;
    }
    return H5PFindTheWordsContent;
}(h5p_content_1.H5pContent));
exports.H5PFindTheWordsContent = H5PFindTheWordsContent;
//# sourceMappingURL=h5p-find-the-words-content.js.map