/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Link } from "react-router-dom";
import {
  concat,
  dec,
  filter,
  find,
  map,
  max,
  pipe,
  prop,
  propOr,
  propEq,
  range,
  reduce,
  reject,
  replace,
} from "ramda";
import PerfectScrollbar from "react-perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import StickyEl from "../../vendor/react-sticky-el.min.js";
import routes from "../../book_fragments/routes.json";
import DarkModeToggle from "./DarkMode";
import * as ß from "./styles";

const IconArrowLeft = () => (
  <span style={{ fontFamily: "FontAwesome" }}>&#xf100;</span>
);

const IconArrowRight = () => (
  <span style={{ fontFamily: "FontAwesome" }}>&#xf101;</span>
);

const trim = s => s.replace(/^\s+|\s+$/g, "");

const capitalize = s => {
  if (typeof s !== "string") return "";
  return (
    s.charAt(0).toUpperCase() + " - " + s.charAt(2).toUpperCase() + s.slice(3)
  );
};

const moduleToName = pipe(
  replace(/^[0-9]+/g, ""),
  replace(/-/g, " "),
  trim,
  capitalize
);

const trimChapterNumber = pipe(
  replace(/^[0-9]+/g, ""),
  replace(/-/g, ""),
  trim
);

const trimSubChapterLetter = pipe(replace(/^[A-Z]\s?-?/g, ""), trim);

const makeNavName = ({ module = "", name }) => {
  const split = module.match(/^[0-9]+-+[a-zA-Z]/g);
  return split.length > 0
    ? split[0]
        .replace("-", ".")
        .replace(/^0/g, "")
        .toUpperCase()
    : "";
};

const createSelectDataChapter = (route, chapterNumber) => ({
  value: route.url,
  label: `${chapterNumber} - ${route.name}`,
});

const createSelectDataSection = route => ({
  value: route.url,
  label: moduleToName(route.module),
});

const getChapterData = chapterNum => {
  const raw = filter(
    propEq("chapter", chapterNum),
    reject(propEq("module", "00--aa-toc"), routes)
  );
  const maybePrepend =
    raw.length > 0 ? [{ value: 0, label: raw[0].name, isDisabled: true }] : [];
  return concat(maybePrepend, map(createSelectDataSection, raw));
};

const getAllChapters = () => {
  const numChapters = reduce(max, -Infinity, map(prop("chapter"), routes));
  const routesWithoutTOC = reject(propEq("module", "00--aa-toc"), routes);
  return map(n =>
    createSelectDataChapter(
      find(propEq("chapter", n), routesWithoutTOC),
      n || 1
    )
  )(range(1, numChapters + 1));
};

const getChapterZero = () => {
  return pipe(
    filter(propEq("chapter", 0)),
    reject(propEq("module", "00--aa-toc"))
  )(routes);
};

function LeftNav({ routeIndex }) {
  const [scrollBarRef, setScrollBarRef] = React.useState(null);
  const currentRoute = routes[routeIndex];
  const nextRoute = propOr(false, routeIndex + 1, routes);
  const previousRoute = propOr(false, routeIndex - 1, routes);
  const chapterZero = getChapterZero();
  const allChapters = getAllChapters();

  const updateScroller = () => {
    try {
      scrollBarRef && scrollBarRef.updateScroll();
    } catch (e) {}
  };

  React.useEffect(updateScroller);

  const chZeroList = chapterZero.map((chap, index) => {
    const { module, url } = chap;
    const isActive = module === currentRoute.module;
    return (
      <Link
        to={url}
        onClick={updateScroller}
        css={ß.chapterZeroItem}
        key={index}
        style={{ fontWeight: isActive ? 700 : "inherit" }}
      >
        <p>
          {pipe(moduleToName, trimChapterNumber, trimSubChapterLetter)(module)}
        </p>
      </Link>
    );
  });

  const tocList = allChapters.map(({ value, label }, index) => {
    const isActive = dec(currentRoute.chapter) === index;
    const chapterData = reject(prop("isDisabled"), getChapterData(index + 1));
    const chapterList = chapterData.map(
      ({ value: subValue, label: subLabel }, subIndex) => {
        const subChapterActive = subValue === currentRoute.url;
        return (
          <li
            css={ß.chapterItem}
            style={{
              display: isActive ? "list-item" : "none",
              fontWeight: subChapterActive ? 700 : "inherit",
            }}
            key={subIndex}
          >
            <Link to={subValue}>
              <p
                style={{
                  fontWeight: isActive && subChapterActive ? 700 : "inherit",
                }}
              >
                {trimSubChapterLetter(subLabel)}
              </p>
            </Link>
          </li>
        );
      }
    );

    return (
      <li key={index} css={ß.chapterItem}>
        <Link
          onClick={e => isActive && e.preventDefault()}
          to={value}
          style={{
            pointerEvents: isActive ? "none" : "inherit",
            cursor: isActive ? "default" : "pointer",
            fontWeight: isActive ? 700 : "inherit",
          }}
        >
          <p style={{ textDecoration: isActive ? "none" : "inherit" }}>
            {trimChapterNumber(label)}
          </p>
        </Link>
        <ol
          css={ß.chapterList}
          style={{
            height: isActive ? "auto" : 0,
          }}
        >
          {chapterList}
        </ol>
      </li>
    );
  });

  const previousRouteId = routeIndex > 1 ? makeNavName(previousRoute) : null;
  const nextRouteId =
    routeIndex < dec(routes.length) ? makeNavName(nextRoute) : null;

  return (
    <div id="left-nav" css={ß.clear}>
      <StickyEl>
        <div css={ß.rootStyle}>
          <DarkModeToggle />
          <PerfectScrollbar
            style={{ maxHeight: "75vh", position: "relative" }}
            containerRef={setScrollBarRef}
          >
            <div>
              {chZeroList}
              <hr css={ß.hr} />
              <ol css={ß.orderedListStyle}>{tocList}</ol>
            </div>
          </PerfectScrollbar>
        </div>
        <div css={ß.buttonNav}>
          {previousRouteId && (
            <Link to={previousRoute.url} style={{ marginBottom: 12 }}>
              <p>
                <IconArrowLeft />
                {previousRouteId}
              </p>
              <p style={{ marginLeft: 3 }}>{previousRoute.name}</p>
            </Link>
          )}
          {nextRouteId && (
            <Link to={nextRoute.url}>
              <p>
                <IconArrowRight />
                {nextRouteId}
              </p>
              <p style={{ marginLeft: 3 }}>{nextRoute.name}</p>
            </Link>
          )}
        </div>
      </StickyEl>
    </div>
  );
}

export default LeftNav;
