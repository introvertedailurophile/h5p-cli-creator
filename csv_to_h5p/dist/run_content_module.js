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
exports.runFlashcards = exports.runDialogcards = exports.runFindTheWords = void 0;
var fs = require("fs");
var papa = require("papaparse");
var path = require("path");
var h5p_package_1 = require("./h5p-package");
var findthewords_creator_1 = require("./findthewords-creator");
var flashcards_creator_1 = require("./flashcards-creator");
var dialogcards_creator_1 = require("./dialogcards-creator");
function runDialogcards(csvfile, outputfile, title, encoding, delimiter, language, mode) {
    return __awaiter(this, void 0, void 0, function () {
        var csv, csvParsed, h5pPackage, creator;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Creating module content type.");
                    csvfile = csvfile.trim();
                    outputfile = outputfile.trim();
                    csv = fs.readFileSync(csvfile, { encoding: encoding });
                    csvParsed = papa.parse(csv, {
                        header: true,
                        delimiter: delimiter,
                        skipEmptyLines: true,
                    });
                    return [4 /*yield*/, h5p_package_1.H5pPackage.createFromHub("H5P.DialogCards", language)];
                case 1:
                    h5pPackage = _a.sent();
                    creator = new dialogcards_creator_1.DialogCardsCreator(h5pPackage, csvParsed.data, mode, path.dirname(csvfile));
                    return [4 /*yield*/, creator.create()];
                case 2:
                    _a.sent();
                    creator.setTitle(title);
                    creator.savePackage(outputfile);
                    return [2 /*return*/];
            }
        });
    });
}
exports.runDialogcards = runDialogcards;
;
function runFindTheWords(csvfile, outputfile, title, encoding, delimiter, language, description) {
    return __awaiter(this, void 0, void 0, function () {
        var csv, csvParsed, h5pPackage, findthewordscreator;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Creating module content type.");
                    csvfile = csvfile.trim();
                    outputfile = outputfile.trim();
                    csv = fs.readFileSync(csvfile, { encoding: encoding });
                    csvParsed = papa.parse(csv, {
                        header: true,
                        delimiter: delimiter,
                        skipEmptyLines: true,
                    });
                    return [4 /*yield*/, h5p_package_1.H5pPackage.createFromHub("H5P.FindTheWords", language)];
                case 1:
                    h5pPackage = _a.sent();
                    findthewordscreator = new findthewords_creator_1.FindTheWordsCreator(h5pPackage, csvParsed.data, description, title, path.dirname(csvfile));
                    return [4 /*yield*/, findthewordscreator.create()];
                case 2:
                    _a.sent();
                    findthewordscreator.savePackage(outputfile);
                    return [2 /*return*/];
            }
        });
    });
}
exports.runFindTheWords = runFindTheWords;
;
function runFlashcards(csvfile, outputfile, title, encoding, delimiter, language, description) {
    return __awaiter(this, void 0, void 0, function () {
        var csv, csvParsed, h5pPackage, flashcardsCreator;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Creating flashcards content type.");
                    csvfile = csvfile.trim();
                    outputfile = outputfile.trim();
                    csv = fs.readFileSync(csvfile, encoding);
                    csvParsed = papa.parse(csv, {
                        header: true,
                        delimiter: delimiter,
                        skipEmptyLines: true,
                    });
                    return [4 /*yield*/, h5p_package_1.H5pPackage.createFromHub("H5P.Flashcards", language)];
                case 1:
                    h5pPackage = _a.sent();
                    flashcardsCreator = new flashcards_creator_1.FlashcardsCreator(h5pPackage, csvParsed.data, description, title, path.dirname(csvfile));
                    return [4 /*yield*/, flashcardsCreator.create()];
                case 2:
                    _a.sent();
                    flashcardsCreator.savePackage(outputfile);
                    return [2 /*return*/];
            }
        });
    });
}
exports.runFlashcards = runFlashcards;
//# sourceMappingURL=run_content_module.js.map