
import * as yargs from "yargs";

import { runFindTheWords } from "./run_content_module";


/**
 * This is the yargs module for findthewords.
 */
export class FindTheWordsModule implements yargs.CommandModule {
   public command = "findthewords <input> <output>";
   public describe =
      "Converts csv input to h5p find the words content. The headings for the column \
                     should be: words";
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
            describe: "title of the content",
            default: "Find the Words",
            type: "string",
         })
         .option("description", {
            describe: "description of the content",
            default: "Find the words from the grid",
            type: "string",
         });


   public handler = async (argv) => {
      await runFindTheWords(

         argv.input,
         argv.output,
         argv.n,
         argv.e,
         argv.d,
         argv.l,
         argv.description
      );
   };
}
