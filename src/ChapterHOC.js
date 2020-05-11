import React, { useEffect, useState } from "react";
import { useBookDispatch } from "./BookContext";
import { filter, pathOr, propEq } from "ramda";
import { debounce } from "throttle-debounce";

function getIndexToIns(arr, num) {
  let index = arr
    .sort((a, b) => a - b)
    .findIndex(currentNum => num <= currentNum);
  return index === -1 ? arr.length : index;
}

const ChapterHOC = ({ children }) => {
  const bookDispatch = useBookDispatch();
  const [scrollPoints, setScrollPoints] = useState([]);
  const h2Elems = filter(propEq("type", "h2"), children);
  const subSections = h2Elems.map(el => {
    const title = pathOr("unnamed section", ["props", "children"], el);
    const id = pathOr("unknown", ["props", "id"], el);
    return { title, id };
  });

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

    bookDispatch({
      type: "setSectionIndex",
      sectionIndex: sectionIdx,
    });
  });

  useEffect(() => {
    bookDispatch({ type: "setSections", sections: subSections });
    updateScrollPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  return <>{children}</>;
};

export default ChapterHOC;
