"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentCreator = void 0;
/**
 * Classes derived from this class can utilize the infrastructure provided here to create content.
 * @template T the h5p content type to create
 */
var ContentCreator = /** @class */ (function () {
    function ContentCreator(h5pPackage, sourcePath) {
        this.h5pPackage = h5pPackage;
        this.sourcePath = sourcePath;
        this.clearPackageContent();
        this.content = this.contentObjectFactory();
    }
    /**
     * This method creates the content for the h5p package by calling the abstract methods of this class. It also
     * adds languages strings in the language specified in the H5P Package.  If you want to add
     * content besides the 'content/content.json' file you have to add these files to the package manually by accessing
     * the h5pPackage property.
     * @returns the content object
     */
    ContentCreator.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addContent(this.content)];
                    case 1:
                        _a.sent();
                        this.addSettings(this.content);
                        this.h5pPackage.languageStrings.addAllToContent(this.content);
                        this.h5pPackage.addMainContentFile(JSON.stringify(this.content));
                        return [2 /*return*/, this.content];
                }
            });
        });
    };
    /**
     * Stores the h5p package at the file specified.
     * @param path
     */
    ContentCreator.prototype.savePackage = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.h5pPackage.savePackage(path)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContentCreator.prototype.clearPackageContent = function () {
        this.h5pPackage.clearContent();
    };
    return ContentCreator;
}());
exports.ContentCreator = ContentCreator;
//# sourceMappingURL=content-creator.js.map