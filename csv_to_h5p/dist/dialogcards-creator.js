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
exports.DialogCardsCreator = void 0;
var path = require("path");
var content_creator_1 = require("./content-creator");
var h5p_audio_1 = require("./models/h5p-audio");
var h5p_dialog_cards_content_1 = require("./models/h5p-dialog-cards-content");
var h5p_image_1 = require("./models/h5p-image");
var DialogCardsCreator = /** @class */ (function (_super) {
    __extends(DialogCardsCreator, _super);
    function DialogCardsCreator(h5pPackage, data, mode, sourcePath) {
        var _this = _super.call(this, h5pPackage, sourcePath) || this;
        _this.data = data;
        _this.mode = mode;
        return _this;
    }
    /**
     * Sets the description displayed when showing the flashcards.
     * @param description
     */
    DialogCardsCreator.prototype.setTitle = function (title) {
        this.h5pPackage.h5pMetadata.title = title;
        this.h5pPackage.addMetadata(this.h5pPackage.h5pMetadata);
    };
    DialogCardsCreator.prototype.contentObjectFactory = function () {
        return new h5p_dialog_cards_content_1.H5PDialogCardsContent();
    };
    DialogCardsCreator.prototype.addContent = function (contentObject) {
        return __awaiter(this, void 0, void 0, function () {
            var imageCounter, audioCounter, _i, _a, line, card, ret, filename, exc_1, ret, filename, exc_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contentObject.dialogs = new Array();
                        imageCounter = 0;
                        audioCounter = 0;
                        _i = 0, _a = this.data;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 17];
                        line = _a[_i];
                        card = {
                            text: line.front,
                            answer: line.back,
                        };
                        if (!line.image) return [3 /*break*/, 8];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, , 8]);
                        ret = void 0;
                        if (!(!line.image.startsWith("http://") &&
                            !line.image.startsWith("https://"))) return [3 /*break*/, 4];
                        return [4 /*yield*/, h5p_image_1.H5pImage.fromLocalFile(path.join(this.sourcePath, line.image))];
                    case 3:
                        ret = _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, h5p_image_1.H5pImage.fromDownload(line.image)];
                    case 5:
                        ret = _b.sent();
                        _b.label = 6;
                    case 6:
                        filename = this.getFilenameForImage(imageCounter++, ret.extension);
                        this.h5pPackage.addContentFile(filename, ret.buffer);
                        ret.image.path = filename;
                        card["image"] = ret.image;
                        console.log("Downloaded image from ".concat(line.image, ". (").concat(ret.buffer.byteLength, " bytes)"));
                        return [3 /*break*/, 8];
                    case 7:
                        exc_1 = _b.sent();
                        console.error(exc_1);
                        card["image"] = undefined;
                        return [3 /*break*/, 8];
                    case 8:
                        if (!line.audio) return [3 /*break*/, 15];
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 14, , 15]);
                        ret = void 0;
                        if (!(!line.audio.startsWith("http://") &&
                            !line.audio.startsWith("https://"))) return [3 /*break*/, 11];
                        return [4 /*yield*/, h5p_audio_1.H5pAudio.fromLocalFile(path.join(this.sourcePath, line.audio))];
                    case 10:
                        ret = _b.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, h5p_audio_1.H5pAudio.fromDownload(line.audio)];
                    case 12:
                        ret = _b.sent();
                        _b.label = 13;
                    case 13:
                        filename = this.getFilenameForAudio(audioCounter++, ret.extension);
                        this.h5pPackage.addContentFile(filename, ret.buffer);
                        ret.audio.path = filename;
                        card["audio"] = [ret.audio];
                        console.log("Downloaded audio from ".concat(line.audio, ". (").concat(ret.buffer.byteLength, " bytes)"));
                        return [3 /*break*/, 15];
                    case 14:
                        exc_2 = _b.sent();
                        console.error(exc_2);
                        card["audio"] = undefined;
                        return [3 /*break*/, 15];
                    case 15:
                        contentObject.dialogs.push(card);
                        _b.label = 16;
                    case 16:
                        _i++;
                        return [3 /*break*/, 1];
                    case 17:
                        contentObject.mode = this.mode;
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogCardsCreator.prototype.addSettings = function (contentObject) {
        contentObject.behaviour = {
            disableBackwardsNavigation: false,
            randomCards: true,
            scaleTextNotCard: false,
        };
    };
    DialogCardsCreator.prototype.getFilenameForImage = function (counter, extension) {
        return "images/".concat(counter).concat(extension);
    };
    DialogCardsCreator.prototype.getFilenameForAudio = function (counter, extension) {
        return "audios/".concat(counter).concat(extension);
    };
    return DialogCardsCreator;
}(content_creator_1.ContentCreator));
exports.DialogCardsCreator = DialogCardsCreator;
//# sourceMappingURL=dialogcards-creator.js.map