import * as yargs from "yargs";

import { runDialogcards } from "./run_content_module";

/**
 * This is the yargs module for dialogcards.
 */
export class DialogCardsModule implements yargs.CommandModule {
   public command = "dialogcards <input> <output>";
   public describe =
      "Converts csv input to h5p dialog cards content. The headings for the columns \
                     should be: front, back, [image] (image is the URL of an image to include)";
   public builder = (y: yargs.Argv) =>
      y
         .positional("input", { describe: "csv input file" })
         .positional("output", {
            describe: "h5p output file including .h5p extension",
         })
         .option("l", {
            describe: "language for translations in h5p content",
            default: "en",
            type: "string",
         })
         .option("d", { describe: "CSV delimiter", default: ";", type: "string" })
         .option("e", { describe: "encoding", default: "UTF-8", type: "string" })
         .option("n", {
            describe: "name/title of the content",
            default: "Flashcards",
            type: "string",
         })
         .option("m", {
            describe: "mode of the content",
            default: "repetition",
            type: "string",
            choices: ["repetition", "normal"],
         });

   public handler = async (argv) => {
      await runDialogcards(
         argv.input,
         argv.output,
         argv.n,
         argv.e,
         argv.d,
         argv.l,
         argv.m
      );
   };
}
