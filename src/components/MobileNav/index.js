/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  assoc,
  concat,
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
import StickyMobileNav from "react-sticky-footer";
import Select from "react-select";
import routes from "../../book_fragments/routes.json";
import routesFr from "../../book_fragments_fr/routes.json";
import { isFrenchRoute, getDefaultContentRoute } from "../../constants/routes";

const rootStyle = css`
  display: flex;
  justify-content: end;
  @media (max-width: 1150px) {
    flex-direction: column;
  }
`;

const selectContainer = css`
  width: 260px;
  margin-right: 12px;
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
    margin: auto 6px;
  }
  & h3 {
    white-space: nowrap;
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 15px;
  }
`;

// const selectMenu = css`
//   max-width: 80vw;
//   min-width: 260px;
// `;

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
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
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
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

const createSelectDataChapter = (route, chapterNumber) => ({
  value: route.url,
  label: `${chapterNumber} - ${route.name}`,
});

const createSelectDataSection = (route) =>
  route.sectionName === "Overview"
    ? {
        value: route.url,
        label: "Overview",
      }
    : {
        value: route.url,
        label: moduleToName(route.module),
      };

const getChapterData = (chapterNum, routesData) => {
  const raw = filter(
    propEq("chapter", chapterNum),
    reject(propEq("module", "00--aa-toc"), routesData)
  );

  let maybePrepend =
    raw.length > 0 && raw[0].sectionName !== "Overview"
      ? [{ value: 0, label: raw[0].name, isDisabled: true }]
      : [];

  if (raw.length > 0 && raw[0].sectionName === "Overview") {
    raw[0].label = raw[0].name;
  }
  return concat(maybePrepend, map(createSelectDataSection, raw));
};

const getAllChapters = (routesData) => {
  const numChapters = reduce(max, -Infinity, map(prop("chapter"), routesData));
  const routesWithoutTOC = reject(propEq("module", "00--aa-toc"), routesData);
  return map((n) =>
    createSelectDataChapter(
      find(propEq("chapter", n), routesWithoutTOC),
      n || 0
    )
  )(range(0, numChapters + 1));
};

function MobileNav() {
  const [isBottomReached, setIsBottomReached] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentRoutename = location?.pathname ?? "/";

  // Determine if we're on French routes
  const isCurrentRouteFrench = isFrenchRoute(currentRoutename);
  const allRoutes = isCurrentRouteFrench ? routesFr || [] : routes;

  // Map home routes to their default content pages
  const targetUrl = getDefaultContentRoute(currentRoutename);

  const routeIndex = findIndex(propEq("url", targetUrl))(allRoutes);

  const currentRoute = allRoutes[routeIndex];

  // Add defensive check for currentRoute
  if (!currentRoute) {
    console.warn(
      `MobileNav: No route found for URL "${targetUrl}". Available routes:`,
      allRoutes.map((r) => r.url)
    );
    return null; // or return a fallback component
  }

  const nextRoute = propOr(false, routeIndex + 1, allRoutes);
  const previousRoute = propOr(false, routeIndex - 1, allRoutes);
  const currentChapter = getChapterData(currentRoute.chapter, allRoutes);
  // const nextChapter = nextRoute && getChapterData(nextRoute.chapter, allRoutes);
  // const previousChapter =
  //   previousRoute && getChapterData(previousRoute.chapter, allRoutes);
  const allChapters = getAllChapters(allRoutes);
  const Selector = ({ defaultValue, options }) => (
    <Select
      defaultValue={defaultValue}
      options={options}
      formatGroupLabel={formatGroupLabel}
      isSearchable={false}
      menuPosition={"fixed"}
      menuPlacement={isBottomReached ? "bottom" : "top"}
      onChange={(e) => (typeof e.value === "string" ? navigate(e.value) : null)}
      styles={{
        container: (provided, state) =>
          Object.assign(provided, selectContainer),
        menu: (provided, state) =>
          pipe(assoc("width", "auto"), assoc("minWidth", "260px"))(provided),
      }}
    />
  );

  const selectDataSection = createSelectDataSection(allRoutes[routeIndex]);

  return (
    <StickyMobileNav
      onMobileNavStateChange={setIsBottomReached}
      bottomThreshold={50}
      normalStyles={{
        zIndex: 1000,
        backgroundColor: "rgba(255,255,255,.8)",
        padding: "2rem",
        width: "100%",
      }}
      stickyStyles={{
        zIndex: 1000,
        backgroundColor: "rgba(255,255,255,.8)",
        padding: "12px",
        width: "100vw",
      }}
    >
      <div css={rootStyle}>
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
          <Link
            to={
              currentRoute?.url_prefix
                ? getDefaultContentRoute(currentRoute.url_prefix)
                : "/"
            }
          >
            <h3>Overview</h3>
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
      <div css={buttonGroupStyle}>
        <Selector
          defaultValue={createSelectDataChapter(
            allRoutes[routeIndex],
            currentRoute.chapter
          )}
          options={allChapters}
        />
        <Selector defaultValue={selectDataSection} options={currentChapter} />
      </div>
    </StickyMobileNav>
  );
}

export default MobileNav;
