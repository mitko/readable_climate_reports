// #!/usr/bin/env ts-node
// imports typings first

// then import the actual library using require() instead of import
// import pdfjsWrong from 'pdfjs-dist';

// var pdfjsWrong = require("pdfjs-dist/es5/build/pdf.js");

import pdfjs from 'pdfjs-dist/legacy/build/pdf.js';

// import workerEntry from 'pdfjs-dist/legacy/build/pdf.worker.entry.js';

// pdfjs.GlobalWorkerOptions.workerSrc = workerEntry.pdfjsworker;

async function parseReport() {

  const pdfPath = './data/original_reports/IPCC_AR6_WGIII_SummaryForPolicymakers.pdf';

  console.log("starting")

  try {
    const res = await pdfjs.getDocument(pdfPath).promise
    console.log("done")

    console.log(res._pdfInfo)
    console.log(res.numPages)
    console.log(await (await res.getPage(3)).getTextContent())
  } catch (e) {
    console.error(e)
  }
}



parseReport()