#!usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var dialogcards_module_1 = require("./dialogcards-module");
var flashcards_module_1 = require("./flashcards-module");
var findthewords_module_1 = require("./findthewords-module");
try {
    yargs
        .command(new flashcards_module_1.FlashcardsModule())
        .command(new dialogcards_module_1.DialogCardsModule())
        .command(new findthewords_module_1.FindTheWordsModule())
        .help().argv;
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=index.js.map