/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import useBook from "../../BookContext";
import { isFrenchRoute, getDefaultContentRoute } from "../../constants/routes";
import {
  concat,
  dec,
  filter,
  find,
  findIndex,
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
// Routes are now passed as props to support multiple languages
import DarkModeToggle from "./DarkMode";
import * as ß from "./styles";

const IconArrowLeft = () => (
  <span style={{ fontFamily: "FontAwesome" }}>&#xf100;</span>
);

const IconArrowRight = () => (
  <span style={{ fontFamily: "FontAwesome" }}>&#xf101;</span>
);

const trim = (s) => s.replace(/^\s+|\s+$/g, "");

const capitalize = (s) => {
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
    ? split[0].replace("-", ".").replace(/^0/g, "").toUpperCase()
    : "";
};

const createSelectDataChapter = (route, chapterNumber) => ({
  value: route.url,
  label: `${chapterNumber} - ${route.name}`,
});

const createSelectDataSection = (route, isFrenchlang = false) => ({
  value: route.url,
  label:
    route.url === route.url_prefix
      ? isFrenchlang
        ? "Aperçu"
        : "Overview"
      : moduleToName(route.module),
});

const getChapterData = (chapterNum, routesData, isFrenchlang = false) => {
  const raw = filter(
    propEq("chapter", chapterNum),
    reject(propEq("module", "00--aa-toc"), routesData)
  );

  const maybePrepend =
    raw.length > 0 ? [{ value: 0, label: raw[0].name, isDisabled: true }] : [];
  return concat(
    maybePrepend,
    map((route) => createSelectDataSection(route, isFrenchlang), raw)
  );
};

const getAllChapters = (routesData) => {
  const numChapters = reduce(max, -Infinity, map(prop("chapter"), routesData));
  const routesWithoutTOC = reject(propEq("module", "00--aa-toc"), routesData);
  return map((n) =>
    createSelectDataChapter(
      find(propEq("chapter", n), routesWithoutTOC),
      n || 1
    )
  )(range(1, numChapters + 1));
};

const getChapterZero = (routesData) => {
  return pipe(
    filter(propEq("chapter", 0)),
    reject(propEq("module", "00--aa-toc"))
  )(routesData);
};

function isScrolledIntoView(element) {
  const rect = element.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;
  const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

  return isVisible;
}

function scrollIntoView(elementName) {
  let count = 0;
  const intervalHandler = setInterval(() => {
    const element = document.getElementById(elementName);

    if (element) {
      try {
        element.scrollIntoView();
        if (isScrolledIntoView(element)) {
          clearInterval(intervalHandler);
          count = 999999;
        }
      } catch (error) {
        console.error("error scrolling into view", error);
      }
    }

    if (count > 1000) {
      clearInterval(intervalHandler);
    } else {
      count += 1;
    }
  }, 10);
}

function LeftNav({ routes = [], setCurrentRoute }) {
  const location = useLocation();

  React.useEffect(() => {
    if (
      location.hash &&
      typeof location.hash === "string" &&
      location.hash.length > 1
    ) {
      const decodedHash = decodeURIComponent(location.hash);
      const elementId = decodedHash.replace("#", "");

      try {
        // First try querySelector with the decoded hash (for CSS selector syntax)
        const element = document.querySelector(decodedHash);
        if (element) {
          element.scrollIntoView();
          return;
        }
      } catch (error) {
        // querySelector failed, likely due to special characters in the selector
        console.warn("querySelector failed, trying getElementById:", error);
      }

      // Fallback: use getElementById with the decoded element ID
      scrollIntoView(elementId);
    }
  }, [location]);

  const currentRoutename = location?.pathname ?? "/";
  const routeIndex = findIndex(
    propEq("url", getDefaultContentRoute(currentRoutename))
  )(routes);

  const currentRoute = routes[routeIndex];

  const [scrollBarRef, setScrollBarRef] = React.useState(null);
  const [bookState] = useBook();
  const currentSections = propOr([], "sections", bookState);
  const currentSectionIndex = propOr(0, "sectionIndex", bookState);
  const currentSubSectionIndex = propOr(0, "subSectionIndex", bookState);

  const nextRoute = propOr(false, routeIndex + 1, routes);
  const previousRoute = propOr(false, routeIndex - 1, routes);

  // Detect if we're in French mode based on current route
  const isCurrentRouteFrench = isFrenchRoute(currentRoutename);

  const chapterZero = getChapterZero(routes);
  const allChapters = getAllChapters(routes);

  const updateScroller = () => {
    try {
      scrollBarRef &&
        typeof scrollBarRef.updateScroll === "function" &&
        scrollBarRef.updateScroll();
    } catch {}
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
        style={{
          fontWeight: isActive ? 700 : "inherit",
        }}
      >
        <p>
          {pipe(moduleToName, trimChapterNumber, trimSubChapterLetter)(module)}
        </p>
      </Link>
    );
  });

  const tocList = allChapters.map(({ value, label }, index) => {
    const isActive = dec(currentRoute.chapter) === index;
    const chapterData = pipe(
      reject(prop("isDisabled")),
      reject((d) =>
        d.label.startsWith(isCurrentRouteFrench ? "Aperçu" : "Overview")
      )
    )(getChapterData(index + 1, routes, isCurrentRouteFrench));
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
                  fontWeight:
                    isActive && subChapterActive && currentSectionIndex === 0
                      ? 700
                      : "inherit",
                }}
              >
                {subLabel === (isCurrentRouteFrench ? "Aperçu" : "Overview")
                  ? subLabel
                  : trimSubChapterLetter(subLabel)}
              </p>
            </Link>
            {subChapterActive && (
              <ul style={{ paddingLeft: 6 }}>
                {currentSections.map(({ title, id, subSubSections }, idx) => {
                  const lastElem = currentSections.length === idx + 1;
                  return (
                    <li key={idx} css={ß.subSectionLi}>
                      <Link
                        to={`#${id}`}
                        onClick={() => {
                          document.getElementById(`${id}`)?.scrollIntoView();
                        }}
                      >
                        <p
                          style={{
                            fontSize: "14px",
                            lineHeight: "150%",
                            margin: "3px 0",
                            fontWeight:
                              currentSectionIndex - 1 === idx ||
                              (lastElem && currentSectionIndex > idx)
                                ? 700
                                : 500,
                          }}
                        >
                          {title}
                        </p>
                      </Link>
                      <ul style={{ paddingLeft: 6 }}>
                        {currentSectionIndex > 0 &&
                          currentSectionIndex - 1 === idx &&
                          subSubSections.map(
                            ({ title: titleI, id: idI }, idxI) => (
                              <li css={ß.subSectionLi} key={idxI}>
                                <Link
                                  to={`#${idI}`}
                                  onClick={() => {
                                    document
                                      .getElementById(`${idI}`)
                                      ?.scrollIntoView();
                                  }}
                                >
                                  <p
                                    style={{
                                      lineHeight: "130%",
                                      fontSize: 15,
                                      fontWeight:
                                        currentSubSectionIndex === idxI ||
                                        (idxI === 0 &&
                                          currentSubSectionIndex < 0)
                                          ? 700
                                          : 500,
                                    }}
                                  >
                                    {titleI}
                                  </p>
                                </Link>
                              </li>
                            )
                          )}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      }
    );

    return (
      <li key={index} css={ß.chapterItem}>
        <Link
          onClick={() => {
            !isActive && setCurrentRoute(value);
          }}
          to={value}
          style={{
            cursor: "pointer",
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
              <p
                style={{
                  marginLeft: 3,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {previousRoute.sectionName}
              </p>
            </Link>
          )}
          {nextRouteId && (
            <Link to={nextRoute.url}>
              <p>
                <IconArrowRight />
                {nextRouteId}
              </p>
              <p
                style={{
                  marginLeft: 3,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {nextRoute.sectionName}
              </p>
            </Link>
          )}
        </div>
      </StickyEl>
    </div>
  );
}

export default LeftNav;
