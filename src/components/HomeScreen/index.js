/** @jsx jsx */
import { jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React from "react";
import * as ß from "./styles";

const HomeScreen = () => (
  <div css={ß.root}>
    <a
      href={`/build/csound-flossmanual-${process.env
        .REACT_APP_CSOUND_FLOSS_VERSION || "dev"}.epub`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>{`Read the EPUB version`}</p>
    </a>
    <a
      href={`/build/csound-flossmanual-${process.env
        .REACT_APP_CSOUND_FLOSS_VERSION || "dev"}.pdf`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>{`Read the PDF version`}</p>
    </a>
    <a
      href={`/build/csound-flossmanual-${process.env
        .REACT_APP_CSOUND_FLOSS_VERSION || "dev"}.odt`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>{`Download OpenDocument version`}</p>
    </a>
  </div>
);

export default HomeScreen;
