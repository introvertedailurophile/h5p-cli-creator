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
exports.H5pPackage = void 0;
var axios_1 = require("axios");
var fs = require("fs");
var fsExtra = require("fs-extra");
var jszip = require("jszip");
var path = require("path");
var helpers_1 = require("./helpers");
var language_strings_1 = require("./language-strings");
/**
 * H5P Package
 */
var H5pPackage = /** @class */ (function () {
    function H5pPackage(contentTypeName) {
        this.contentTypeName = contentTypeName;
        this.h5pHubUrl = "https://api.h5p.org/v1/";
    }
    /**
     * Factory method to fetch a package for a content type from the h5p hub and load its content into memory.
     * @param contentTypeName the name of the content type to download
     * @param language the code of the language to use the language strings for
     * @returns the newly created package object
     */
    H5pPackage.createFromHub = function (contentTypeName, language) {
        return __awaiter(this, void 0, void 0, function () {
            var pack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pack = new H5pPackage(contentTypeName);
                        return [4 /*yield*/, pack.get()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pack.initialize(language)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, pack];
                }
            });
        });
    };
    /**
     * Removes all content from the package.
     */
    H5pPackage.prototype.clearContent = function () {
        this.packageZip.remove("content");
    };
    H5pPackage.prototype.addMetadata = function (h5pMetadata) {
        var json = JSON.stringify(h5pMetadata);
        this.packageZip.file("h5p.json", Buffer.from(json));
    };
    /**
     * Creates a content.json in the package containing the passed string.
     * @param json
     */
    H5pPackage.prototype.addMainContentFile = function (json) {
        this.packageZip.file("content/content.json", Buffer.from(json), {
            createFolders: false
        });
    };
    H5pPackage.prototype.addContentFile = function (path, buffer) {
        this.packageZip.file("content/" + path, buffer, { createFolders: false });
    };
    /**
     * Stores the package to the disk
     * @param path
     * @returns
     */
    H5pPackage.prototype.savePackage = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.packageZip.generateAsync({ type: "nodebuffer" })];
                    case 1:
                        file = _a.sent();
                        fs.writeFileSync(path, file);
                        console.log("Stored H5P package at ".concat(path, "."));
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Downloads the package from the h5p hub
     * @param contentTypeName The name of the package to download.
     * @returns The binary data of the package
     */
    H5pPackage.prototype.downloadContentType = function (contentTypeName) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(this.h5pHubUrl + "content-types/" + contentTypeName, { responseType: "arraybuffer" })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new Error("Error: Could not download content type from H5P hub.");
                        }
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
     * Downloads the h5p package from the hub or uses a locally cached copy and loads the
     * content for further processing.
     * @returns the jszip object
     */
    H5pPackage.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localPath, dataBuffer, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        localPath = path.resolve("content-type-cache/".concat(this.contentTypeName, ".h5p"));
                        return [4 /*yield*/, fsExtra.pathExists(localPath)];
                    case 1:
                        if (!!(_c.sent())) return [3 /*break*/, 4];
                        _a = helpers_1.toBuffer;
                        return [4 /*yield*/, this.downloadContentType(this.contentTypeName)];
                    case 2:
                        dataBuffer = _a.apply(void 0, [_c.sent()]);
                        return [4 /*yield*/, fsExtra.writeFile(localPath, dataBuffer)];
                    case 3:
                        _c.sent();
                        console.log("Downloaded content type package ".concat(this.contentTypeName, " from H5P Hub."));
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, fsExtra.readFile(localPath)];
                    case 5:
                        dataBuffer = _c.sent();
                        console.log("Using cached content type package from ".concat(localPath));
                        _c.label = 6;
                    case 6:
                        _b = this;
                        return [4 /*yield*/, jszip.loadAsync(dataBuffer)];
                    case 7:
                        _b.packageZip = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    H5pPackage.prototype.getLibraryInformation = function (name) {
        for (var _i = 0, _a = this.h5pMetadata.preloadedDependencies; _i < _a.length; _i++) {
            var dep = _a[_i];
            if (dep.machineName === name) {
                return {
                    name: dep.machineName,
                    majorVersion: +dep.majorVersion,
                    minorVersion: +dep.minorVersion
                };
            }
        }
    };
    /**
     * Initializes the h5p package
     * @param language the code of the language to use the language strings for
     */
    H5pPackage.prototype.initialize = function (language) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, libInfo, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, this.packageZip.file("h5p.json").async("text")];
                    case 1:
                        _a.h5pMetadata = _c.apply(_b, [_e.sent()]);
                        libInfo = this.getLibraryInformation(this.h5pMetadata.mainLibrary);
                        _d = this;
                        return [4 /*yield*/, language_strings_1.LanguageStrings.fromLibrary(this.packageZip, libInfo.name, libInfo.majorVersion, libInfo.minorVersion, language)];
                    case 2:
                        _d.languageStrings = _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return H5pPackage;
}());
exports.H5pPackage = H5pPackage;
//# sourceMappingURL=h5p-package.js.map