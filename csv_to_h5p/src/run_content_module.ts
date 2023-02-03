import * as fs from "fs";
import * as papa from "papaparse";
import * as path from "path";

import { H5pPackage } from "./h5p-package";

import { FindTheWordsCreator } from "./findthewords-creator";
import { FlashcardsCreator } from './flashcards-creator';
import { DialogCardsCreator } from "./dialogcards-creator";


async function runDialogcards(
   csvfile: string,
   outputfile: string,
   title: string,
   encoding: BufferEncoding,
   delimiter: string,
   language: string,
   mode: "repetition" | "normal"
): Promise<void> {
   console.log("Creating module content type.");
   csvfile = csvfile.trim();
   outputfile = outputfile.trim();

   let csv = fs.readFileSync(csvfile, { encoding });
   let csvParsed = papa.parse(csv, {
      header: true,
      delimiter,
      skipEmptyLines: true,
   });
   let h5pPackage = await H5pPackage.createFromHub(
      "H5P.DialogCards",
      language
   );
   let creator = new DialogCardsCreator(
      h5pPackage,
      csvParsed.data as any,
      mode,
      path.dirname(csvfile)
   );
   await creator.create();
   creator.setTitle(title);
   creator.savePackage(outputfile);
};


async function runFindTheWords(
   csvfile: string,
   outputfile: string,
   title: string,
   encoding: BufferEncoding,
   delimiter: string,
   language: string,
   description: string
): Promise<void> {
   console.log("Creating module content type.");
   csvfile = csvfile.trim();
   outputfile = outputfile.trim();

   let csv = fs.readFileSync(csvfile, { encoding });
   let csvParsed = papa.parse(csv, {
      header: true,
      delimiter,
      skipEmptyLines: true,
   });
   let h5pPackage = await H5pPackage.createFromHub(
      "H5P.FindTheWords",
      language
   );
   let findthewordscreator = new FindTheWordsCreator(
      h5pPackage,
      csvParsed.data as any,
      description,
      title,
      path.dirname(csvfile)
   );
   await findthewordscreator.create();
   findthewordscreator.savePackage(outputfile);
};

async function runFlashcards(
   csvfile: string,
   outputfile: string,
   title: string,
   encoding: BufferEncoding,
   delimiter: string,
   language: string,
   description: string
): Promise<void> {
   console.log("Creating flashcards content type.");
   csvfile = csvfile.trim();
   outputfile = outputfile.trim();

   let csv = fs.readFileSync(csvfile, encoding);
   let csvParsed = papa.parse(csv, {
      header: true,
      delimiter,
      skipEmptyLines: true,
   });
   let h5pPackage = await H5pPackage.createFromHub("H5P.Flashcards", language);
   let flashcardsCreator = new FlashcardsCreator(
      h5pPackage,
      csvParsed.data as any,
      description,
      title,
      path.dirname(csvfile)
   );
   await flashcardsCreator.create();
   flashcardsCreator.savePackage(outputfile);
}

export { runFindTheWords, runDialogcards, runFlashcards };