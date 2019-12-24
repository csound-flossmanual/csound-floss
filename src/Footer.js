/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense, useEffect, useState } from "react";
import { navigate } from "./history";
import { Link } from "react-router-dom";
import {
  assoc,
  concat,
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
  replace
} from "ramda";
import StickyFooter from "react-sticky-footer";
import Select from "react-select";
import routes from "./book_fragments/routes.json";

const rootStyle = css`
  display: flex;
  justify-content: end;
  padding-right: 120px;
  @media (max-width: 1150px) {
    flex-direction: column;
  }
`;

const selectContainer = css`
  width: 260px;
  margin-right: 24px;
`;

const buttonGroupStyle = css`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1150px) {
    justify-content: center;
    margin-top: 12px;
  }
  & a,
  span {
    padding: 0;
    margin: auto 12px;
  }
  & h3 {
    white-space: nowrap;
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

// const selectMenu = css`
//   max-width: 80vw;
//   min-width: 260px;
// `;

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center"
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
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

const createSelectDataChapter = (route, chapterNumber) => ({
  value: route.url,
  label: `${chapterNumber} - ${route.name}`
});

const createSelectDataSection = route => ({
  value: route.url,
  label: moduleToName(route.module)
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
      n || 0
    )
  )(range(0, numChapters + 1));
};

function Footer({ routeIndex }) {
  const [isBottomReached, setIsBottomReached] = useState(false);
  const currentRoute = routes[routeIndex];
  const nextRoute = propOr(false, routeIndex + 1, routes);
  const previousRoute = propOr(false, routeIndex - 1, routes);
  const currentChapter = getChapterData(currentRoute.chapter);
  // const nextChapter = nextRoute && getChapterData(nextRoute.chapter);
  // const previousChapter =
  //   previousRoute && getChapterData(previousRoute.chapter);
  const allChapters = getAllChapters();
  const Selector = ({ defaultValue, options }) => (
    <Select
      defaultValue={defaultValue}
      options={options}
      formatGroupLabel={formatGroupLabel}
      isSearchable={false}
      menuPosition={"fixed"}
      menuPlacement={isBottomReached ? "bottom" : "top"}
      onChange={e => (typeof e.value === "string" ? navigate(e.value) : null)}
      styles={{
        container: (provided, state) =>
          Object.assign(provided, selectContainer),
        menu: (provided, state) =>
          pipe(
            assoc("width", "auto"),
            assoc("minWidth", "260px")
          )(provided)
      }}
    />
  );

  return (
    <StickyFooter
      onFooterStateChange={setIsBottomReached}
      bottomThreshold={50}
      normalStyles={{
        backgroundColor: "rgba(255,255,255,.8)",
        padding: "2rem",
        width: "100%"
      }}
      stickyStyles={{
        backgroundColor: "rgba(255,255,255,.8)",
        padding: "2rem",
        width: "100vw"
      }}
    >
      <div css={rootStyle}>
        <div css={buttonGroupStyle}>
          <Selector
            defaultValue={createSelectDataChapter(
              routes[routeIndex],
              currentRoute.chapter
            )}
            options={allChapters}
          />
          <Selector
            defaultValue={createSelectDataSection(routes[routeIndex])}
            options={currentChapter}
          />
        </div>
        <div css={buttonGroupStyle}>
          {previousRoute ? (
            <Link to={previousRoute.url}>
              <h3>Previous Chapter</h3>
            </Link>
          ) : (
            <span>
              <h3>Previous Chapter</h3>
            </span>
          )}
          <Link to="/">
            <h3>Table of contents</h3>
          </Link>
          {nextRoute ? (
            <Link to={nextRoute.url}>
              <h3>Next Chapter</h3>
            </Link>
          ) : (
            <span>
              <h3>Next Chapter</h3>
            </span>
          )}
        </div>
      </div>
    </StickyFooter>
  );
}

export default Footer;
