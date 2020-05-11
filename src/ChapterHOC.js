import React from "react";
import { useBookDispatch } from "./BookContext";
import { filter, pathOr, propEq } from "ramda";

const ChapterHOC = ({ children }) => {
  const bookDispatch = useBookDispatch();
  const h2Elems = filter(propEq("type", "h2"), children);
  const subSections = h2Elems.map(el => {
    const title = pathOr("unnamed section", ["props", "children"], el);
    const id = pathOr("unknown", ["props", "id"], el);
    return { title, id };
  });

  React.useEffect(() => {
    bookDispatch({ type: "setSections", sections: subSections });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default ChapterHOC;
