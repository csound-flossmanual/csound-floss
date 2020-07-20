import React, { useEffect, useState } from "react";
import { useBookDispatch } from "./BookContext";
import {
  append,
  assocPath,
  curry,
  isEmpty,
  path,
  pathOr,
  propEq,
  propOr,
  reduce,
} from "ramda";
import { debounce } from "throttle-debounce";

function getIndexToIns(arr, num) {
  let index = arr
    .sort((a, b) => a - b)
    .findIndex(currentNum => num <= currentNum);
  return index === -1 ? arr.length : index;
}

var updatePath = curry(function updatePath(p, transform, coll) {
  return assocPath(p, transform(path(p, coll)), coll);
});

const getSections = reduce((acc, el) => {
  if (propEq("type", "h2", el)) {
    return append(
      {
        title: pathOr("unnamed section", ["props", "children"], el),
        id: pathOr("unknown", ["props", "id"], el),
        subSubSections: [],
      },
      acc
    );
  } else if (isEmpty(acc)) {
    return acc;
  } else if (propEq("type", "h3", el)) {
    return updatePath(
      [acc.length - 1, "subSubSections"],
      append({
        title: pathOr("unnamed section", ["props", "children"], el),
        id: pathOr("unknown", ["props", "id"], el),
      }),
      acc
    );
  } else {
    return acc;
  }
}, []);

const ChapterHOC = ({ children }) => {
  const bookDispatch = useBookDispatch();
  const [scrollPoints, setScrollPoints] = useState([]);
  const subSections = getSections(children);

  const updateScrollPoints = () =>
    setScrollPoints(
      subSections
        .map(({ id }) => {
          const element = document.getElementById(id);
          return element.offsetTop - element.scrollTop + element.clientTop;
        })
        .sort()
    );

  const onScroll = debounce(100, () => {
    updateScrollPoints();
    const docEl = document.documentElement;
    const yOffset = window.pageYOffset || docEl.scrollTop || 0;
    const sectionIdx = getIndexToIns(scrollPoints, yOffset + 200);

    const currSubSub = propOr(
      [],
      "subSubSections",
      propOr({}, sectionIdx - 1, subSections)
    );

    const currSubSubPoints =
      sectionIdx < 1
        ? []
        : currSubSub
            .map(({ id }) => {
              const element = document.getElementById(id);
              if (element) {
                return (
                  element.offsetTop - element.scrollTop + element.clientTop
                );
              } else {
                return 0;
              }
            })
            .sort();

    const maybeSubSubIdx = getIndexToIns(currSubSubPoints, yOffset + 100) - 1;
    const subSectionIndex =
      currSubSub.length > 0 && maybeSubSubIdx < 0 ? 0 : maybeSubSubIdx;

    bookDispatch({
      type: "setSectionIndex",
      sectionIndex: sectionIdx,
      subSectionIndex,
    });
  });

  useEffect(() => {
    bookDispatch({ type: "setSections", sections: subSections });
    updateScrollPoints();
    return () => setScrollPoints([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookDispatch]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      onScroll.cancel();
    };
  }, [onScroll]);

  return <>{children}</>;
};

export default ChapterHOC;
