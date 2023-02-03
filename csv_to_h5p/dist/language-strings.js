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
exports.LanguageStrings = void 0;
/**
 * Manages the string that are displayed to the user in an h5p library and configurable in the editor.
 */
var LanguageStrings = /** @class */ (function () {
    function LanguageStrings(semantics, languageFile) {
        if (languageFile === void 0) { languageFile = null; }
        this.semantics = semantics;
        this.languageFile = languageFile;
    }
    /**
     * Creates a H5pLanguageStrings object by opening a library in the H5P package.
     * @param h5pPackage - the zip package containing the library
     * @param libraryName - the full name of the library (e.g. H5P.Flashcards)
     * @param majorVersion - e.g. 1
     * @param minorVersion - e.g 0
     * @param languageCode - the language code as used in h5p (e.g. en, de, fr).
     * @returns library
     */
    LanguageStrings.fromLibrary = function (h5pPackage, libraryName, majorVersion, minorVersion, languageCode) {
        if (languageCode === void 0) { languageCode = "en"; }
        return __awaiter(this, void 0, void 0, function () {
            var libraryDirectory, semanticsEntry, langObject, langEntry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        libraryDirectory = "".concat(libraryName, "-").concat(majorVersion, ".").concat(minorVersion);
                        return [4 /*yield*/, h5pPackage.file(libraryDirectory + "/semantics.json").async("text")];
                    case 1:
                        semanticsEntry = _a.sent();
                        langObject = null;
                        if (!(languageCode !== "en")) return [3 /*break*/, 3];
                        return [4 /*yield*/, h5pPackage.file(libraryDirectory + "/language/".concat(languageCode, ".json")).async("text")];
                    case 2:
                        langEntry = _a.sent();
                        langObject = JSON.parse(langEntry);
                        _a.label = 3;
                    case 3: return [2 /*return*/, new LanguageStrings(JSON.parse(semanticsEntry), langObject)];
                }
            });
        });
    };
    /**
     * Gets language strings
     * @param name The name of the string.
     * @returns The string in the language this object was initialized with.
     */
    LanguageStrings.prototype.get = function (name) {
        for (var key in this.semantics) {
            if (this.semantics[key].name === undefined || this.semantics[key].name !== name) {
                continue;
            }
            if (this.languageFile === null || this.languageFile.semantics[key].default === undefined) {
                return this.semantics[key].default;
            }
            else {
                return this.languageFile.semantics[key].default;
            }
        }
    };
    /**
     * Gets alls language strings
     * @returns language strings including their name and value
     */
    LanguageStrings.prototype.getAll = function () {
        var list = new Array();
        for (var key in this.semantics) {
            if (this.semantics[key].name !== undefined && this.semantics[key].common === true) {
                list.push({ name: this.semantics[key].name, value: this.get(this.semantics[key].name) });
            }
        }
        return list;
    };
    /**
     * Adds all language strings as properties to the object
     * @param content
     */
    LanguageStrings.prototype.addAllToContent = function (content) {
        var commonStrings = this.getAll();
        for (var _i = 0, commonStrings_1 = commonStrings; _i < commonStrings_1.length; _i++) {
            var str = commonStrings_1[_i];
            if (content[str.name] !== undefined) {
                continue;
            }
            content[str.name] = str.value;
        }
    };
    return LanguageStrings;
}());
exports.LanguageStrings = LanguageStrings;
//# sourceMappingURL=language-strings.js.map