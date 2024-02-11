const path = require("path");
const R = require("ramda");
const fg = require("fast-glob");
const fs = require("fs");
const { BOOK_DIRECTORY, JSX_OUTPUT } = require("./constants");
const toc = require("../toc.json");

const prepend = ({ title }) => `
import React, { useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Link,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Stack
} from "@chakra-ui/react";
import ChapterHOC from "../ChapterHOC";
import { useTitle } from "../use-title";

const Chapter = () => {
  useTitle("${title}");
return (
   <Stack spacing={6}>`;

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

const buildOverviewPages = () => {
  for (const { chapter, with_overview_page = false, name, url_prefix } of toc) {
    if (with_overview_page) {
      const chapterPrefix = chapter < 10 ? `0${chapter}` : `${chapter}`;
      const chapterFiles = fg
        .sync([`${BOOK_DIRECTORY}/${chapterPrefix}*.md`], { dot: false })
        .sort();
      let overviewMarkdown = `<Heading as='h1' fontWeight="400" noOfLines={1}>Chapter ${chapter} overview - ${name}</Heading>`;
      // overviewMarkdown = `${overviewMarkdown}\n<Heading as='h2'>${name}</Heading>`;
      overviewMarkdown = `${overviewMarkdown}\n<Accordion sx={{borderColor: "aliceblue"}} allowMultiple>`;
      for (const chapterFile of chapterFiles) {
        const content = fs.readFileSync(chapterFile).toString();
        const sectionBasename = path
          .basename(chapterFile)
          .replace(/\d\d-/i, "")
          .replace(".md", "")
          .replace(/^[a-z]-/i, "");
        const sectionsMatches = Array.from(
          content.matchAll(/#{1,6}.+(?=\n)/g)
        ).map((m) => Array.isArray(m) && m[0]);

        const sectionNameMatches = sectionsMatches.filter(
          (s) => typeof s === "string" && /^# .*/.test(s)
        );

        const subSectionNameMatches = sectionsMatches.filter(
          (s) => typeof s === "string" && /^## .*/.test(s)
        );

        let sectionName =
          sectionNameMatches.length > 0
            ? sectionNameMatches[0]
            : "Undefined chapter";

        sectionName = sectionName.replace(cleanHeadingIdRegex, "");
        const sectionNameButton = `<Heading as='h3' margin="0" size="md">
        <AccordionButton cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="${url_prefix}/${sectionBasename}" color="linkColor">
            ${sectionName}
            </Link>
           </Box>
          <AccordionIcon cursor="pointer" />
          </AccordionButton>
        </Heading>`;

        overviewMarkdown = `${overviewMarkdown}\n<AccordionItem>${sectionNameButton}\n<AccordionPanel>
          <UnorderedList sx={{listStyleType: "' '", margin: 0, li: {
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
          overviewMarkdown = `${overviewMarkdown}<ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="${url_prefix}/${sectionBasename}#${subsectionId}">${subsectionClean}</Link>\n`;

          overviewMarkdown = `${overviewMarkdown}<UnorderedList p="0">`;
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
              ]) => `<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="${url_prefix}/${sectionBasename}#${id}">${word}</Link></ListItem>`
            )
            .join("\n")}`;
          overviewMarkdown = `${overviewMarkdown}</UnorderedList></ListItem>`;
        }
        overviewMarkdown = `${overviewMarkdown}\n</UnorderedList></AccordionPanel></AccordionItem>`;
      }
      // const tmpLoc = path.join(tmpdir(), `${chapterPrefix}-overview.md`);
      // fs.writeFileSync(tmpLoc, overviewMarkdown);
      // execMarkdownToHtml(tmpLoc);

      overviewMarkdown = `${overviewMarkdown}\n</Accordion>`;

      const jsxPage = `${prepend({
        title: name,
      })}\n${overviewMarkdown}\n${append}`;
      // console.log(jsxPage);
      fs.writeFileSync(
        path.join(JSX_OUTPUT, `${chapterPrefix}-overview.jsx`),
        jsxPage
      );
    }
  }
};

module.exports = { buildOverviewPages };
// buildOverviewPages();
