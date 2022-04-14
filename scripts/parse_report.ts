// #!/usr/bin/env ts-node
import fs from 'fs';
import lodash from 'lodash';
import pdfjs from 'pdfjs-dist/legacy/build/pdf.js';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

function isTextItem(item: any): item is TextItem {
  return (item as TextItem) !== undefined;
}

type Line = {
  lineY: number;
  items: TextItem[];
};

type Paragraph = {
  tag?: string;
  lines: Line[];
};

async function parseReport() {
  const pdfPath = "./data/original_reports/IPCC_AR6_WGIII_SummaryForPolicymakers.pdf";

  console.log("starting");

  const params = {
    pageStart: 1,
    pageEnd: Number.MAX_SAFE_INTEGER,
    hasHeader: true,
    headerAbove: 790,
    hasFooter: true,
    footerBelow: 60,
    paragraphBreak: 18,
  };

  const READABLE_PARAGRAPHS = [];
  try {
    const res = await pdfjs.getDocument(pdfPath).promise;
    const N = res.numPages;

    for (let i = params.pageStart; i <= params.pageEnd && i <= N; i++) {
      const pageData = await res.getPage(i);
      const textContent = await pageData.getTextContent();
      // // NOTE - PDFJS might not be convenient for extracting images.
      // // There are too many possible ways to render image.
      // const structTree = await pageData.getOperatorList();
      // for (const operator of structTree.fnArray) {
      //   pdfjs.OPS.paintImageXObject;
      // }
      // fs.writeFileSync("data/debug/structTree.txt", JSON.stringify(structTree, null, 2));

      let pageText = "";

      // Save debug info
      const pageItemsRaw = textContent.items
        .map((item) => JSON.stringify(item, null, 2))
        .join("\n");
      fs.writeFileSync("data/debug/pageRaw.txt", pageItemsRaw);

      let previousItem;
      const rawLines = [];
      let currLine = [];
      for (const item of textContent.items) {
        if (isTextItem(item)) {
          currLine.push(item);
          let cleanItemStr = item.str;
          pageText += cleanItemStr;

          if (item.hasEOL) {
            rawLines.push(currLine);
            currLine = [];
            pageText += "\n";
          }

          previousItem = item;
        }
      }
      const lines: Line[] = lodash
        .sortBy(
          rawLines.map((items) => {
            const lineY = items[0]?.transform[5];
            return { lineY, items };
          }),
          (line) => -1 * line.lineY
        )
        // Ignore headers and footers, they don't have useful content
        .filter((line) => !(params.hasHeader && params.headerAbove < line.lineY))
        .filter((line) => !(params.hasFooter && params.footerBelow > line.lineY));
      fs.writeFileSync("data/debug/linesGrouped.txt", JSON.stringify(lines, null, 2));

      const linesSplit: Line[][] = [[]];
      for (const line of lines) {
        const currParagraph = linesSplit[linesSplit.length - 1]!;
        if (currParagraph.length === 0) {
          currParagraph.push(line);
        } else {
          const lastLineY = currParagraph[currParagraph?.length - 1]!.lineY;
          if (lastLineY - line.lineY > params.paragraphBreak) {
            linesSplit.push([line]);
          } else {
            currParagraph.push(line);
          }
        }
      }
      const paragraphs: Paragraph[] = linesSplit.map((lines) => ({
        tag: lines[0]?.items[0]?.str,
        lines,
      }));
      const readablePageParagraphs = paragraphs.map((p) => ({
        tag: p.tag,
        text: p.lines.map((line) => line.items.map((item) => item.str).join("")).join("\n"),
      }));
      // fs.writeFileSync(
      //   "data/debug/paragraphsGrouped.txt",
      //   JSON.stringify(readablePageParagraphs, null, 2)
      // );

      READABLE_PARAGRAPHS.push(...readablePageParagraphs);
    }

    fs.writeFileSync(
      "data/debug/readableParagraphs.txt",
      JSON.stringify(READABLE_PARAGRAPHS, null, 2)
    );
  } catch (e) {
    console.error(e);
  }
}

parseReport();
