const path = require("path");
const R = require("ramda");
const fg = require("fast-glob");
const fs = require("fs");
const {
  BOOK_DIRECTORY,
  JSX_OUTPUT,
  TOC_FILE,
  IS_FRENCH,
} = require("./constants");
const toc = require(TOC_FILE);

const prepend = ({ title }) => `
import React, { useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import {
  Accordion,
  Box,
  Heading,
  Link,
  List,
  Stack
} from "@chakra-ui/react";
import ChapterHOC from "../ChapterHOC";
import { useTitle } from "../use-title";

const Chapter = () => {
  useTitle("${title}");
return (
   <Stack gap={6}>`;

const append = `</Stack>
)};

export default Chapter;`;

// const tocDebug = [
//   {
//     chapter: 3,
//     name: "Csound Language",
//     url_prefix: "/csound-language",
//     with_overview_page: true,
//   },
// ];

const cleanHeadingIdRegex = /[#_\\*]/g;
const makeId = (s) =>
  s
    .toLowerCase()
    .replace(/\//, "")
    .replace(/([\W])+/g, "-")
    .replace(/(_|-| )+$/, "")
    .replace(/^(_|-| )+/, "")
    .replace(/-_/g, "-")
    .replace(/_-/g, "-")
    .replace(/-+/g, "-")
    .replace("-csd", ".csd");

const buildOverviewPages = (lang = null) => {
  // Determine language: prioritize argument, fall back to env var, default to 'en'
  const currentLang = lang || process.env.LANG || "en";
  const isFrench = currentLang === "fr";
  const isFarsi = currentLang === "fa";

  // Load language-specific constants
  const langDirSuffix = isFrench ? "-fr" : isFarsi ? "-fa" : "";
  const fragmentsDirSuffix = isFrench ? "_fr" : isFarsi ? "_fa" : "";
  const bookDirectory = path.resolve(__dirname, `../book${langDirSuffix}`);
  const jsxOutput = path.resolve(
    __dirname,
    `../src/book_fragments${fragmentsDirSuffix}`,
  );
  const tocFile = isFrench
    ? "../toc-fr.json"
    : isFarsi
      ? "../toc-fa.json"
      : "../toc.json";
  const toc = require(tocFile);

  for (const { chapter, with_overview_page = false, name, url_prefix } of toc) {
    if (with_overview_page) {
      const chapterPrefix = chapter < 10 ? `0${chapter}` : `${chapter}`;
      const chapterFiles = fg
        .sync([`${bookDirectory}/${chapterPrefix}*.md`], { dot: false })
        .sort();
      let overviewMarkdown = `<Heading as='h1' fontWeight="400" lineClamp={1}>Chapter ${chapter} overview - ${name}</Heading>`;
      // overviewMarkdown = `${overviewMarkdown}\n<Heading as='h2'>${name}</Heading>`;
      overviewMarkdown = `${overviewMarkdown}\n<Accordion.Root css={{borderColor: "aliceblue"}} multiple>`;
      for (const chapterFile of chapterFiles) {
        const content = fs.readFileSync(chapterFile).toString();
        const sectionBasename = path
          .basename(chapterFile)
          .replace(/\d\d-/i, "")
          .replace(".md", "")
          .replace(/^[a-z]-/i, "");

        // Convert section basename to lowercase for French URLs (same logic as in utils.js)
        const urlSectionBasename = isFrench
          ? sectionBasename.toLowerCase()
          : sectionBasename;
        const sectionsMatches = Array.from(
          content.matchAll(/#{1,6}.+(?=\n)/g),
        ).map((m) => Array.isArray(m) && m[0]);

        const sectionNameMatches = sectionsMatches.filter(
          (s) => typeof s === "string" && /^# .*/.test(s),
        );

        const subSectionNameMatches = sectionsMatches.filter(
          (s) => typeof s === "string" && /^## .*/.test(s),
        );

        let sectionName =
          sectionNameMatches.length > 0
            ? sectionNameMatches[0]
            : "Undefined chapter";

        sectionName = sectionName.replace(cleanHeadingIdRegex, "");
        const sectionNameButton = `<Heading as='h3' margin="0" size="md">
        <Accordion.ItemTrigger cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="${url_prefix}/${urlSectionBasename}" color="linkColor">
            ${sectionName}
            </Link>
           </Box>
          <Accordion.ItemIndicator cursor="pointer">⌄</Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </Heading>`;

        overviewMarkdown = `${overviewMarkdown}\n<Accordion.Item value="${urlSectionBasename}">${sectionNameButton}\n<Accordion.ItemContent><Accordion.ItemBody>
          <List.Root css={{listStyleType: "' '", margin: 0, "& li": {
             textTransform: "uppercase",
             maxWidth: "70%",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             overflow: "hidden"
            }}}>\n`;

        // overviewMarkdown = `${overviewMarkdown}\n\n## ${sectionName.replace(
        //   /#/g,
        //   ""
        // )}\n\n`;

        for (const subsectionMatch of subSectionNameMatches) {
          const subsubSections = [];
          let withinSubsection = true;
          let currentIndex = sectionsMatches.indexOf(subsectionMatch) + 1;

          while (withinSubsection && currentIndex < sectionsMatches.length) {
            if (/^### .*/.test(sectionsMatches[currentIndex])) {
              subsubSections.push(sectionsMatches[currentIndex]);
            }
            if (
              /^## .*/.test(sectionsMatches[currentIndex]) ||
              /^# .*/.test(sectionsMatches[currentIndex])
            ) {
              withinSubsection = false;
            }
            currentIndex += 1;
          }
          const subsectionClean = subsectionMatch
            .replace(cleanHeadingIdRegex, "")
            .trim();
          const subsectionId = makeId(subsectionMatch.replace(/#/g, ""));
          overviewMarkdown = `${overviewMarkdown}<List.Item>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="${url_prefix}/${urlSectionBasename}#${subsectionId}">${subsectionClean}</Link>\n`;

          overviewMarkdown = `${overviewMarkdown}<List.Root p="0">`;
          const subsubSectionsMd = subsubSections.map((s) => [
            `${(s || "undefined subchapter")
              .replace(/[0-9]_/g, " ")
              .replace(cleanHeadingIdRegex, "")}`,
            makeId(s),
          ]);
          overviewMarkdown = `${overviewMarkdown}${subsubSectionsMd
            .map(
              ([
                word,
                id,
              ]) => `<List.Item maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="${url_prefix}/${urlSectionBasename}#${id}">${word}</Link></List.Item>`,
            )
            .join("\n")}`;
          overviewMarkdown = `${overviewMarkdown}</List.Root></List.Item>`;
        }
        overviewMarkdown = `${overviewMarkdown}\n</List.Root></Accordion.ItemBody></Accordion.ItemContent></Accordion.Item>`;
      }
      // const tmpLoc = path.join(tmpdir(), `${chapterPrefix}-overview.md`);
      // fs.writeFileSync(tmpLoc, overviewMarkdown);
      // execMarkdownToHtml(tmpLoc);

      overviewMarkdown = `${overviewMarkdown}\n</Accordion.Root>`;

      const jsxPage = `${prepend({
        title: name,
      })}\n${overviewMarkdown}\n${append}`;
      // console.log(jsxPage);
      fs.writeFileSync(
        path.join(jsxOutput, `${chapterPrefix}-overview.jsx`),
        jsxPage,
      );
    }
  }
};

module.exports = { buildOverviewPages };
// buildOverviewPages();
