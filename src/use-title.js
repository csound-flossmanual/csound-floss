import React from "react";

export const useTitle = (title) => {
  const documentDefined = typeof document !== "undefined";
  const originalTitle = React.useRef(documentDefined ? document.title : null);

  React.useEffect(() => {
    if (!documentDefined) {
      return;
    }

    if (document.title !== title) {
      document.title = title;
    }

    const currentDocumentTitle = originalTitle.current;
    return () => {
      document.title = currentDocumentTitle;
    };
  }, [documentDefined, originalTitle, title]);
};
