/** @jsx jsx */
import { jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React from "react";
// import pwaLogo from "../../assets/pwa_wikimedia.png";
import wasmLogo from "../../assets/wasm_wikimedia.svg";
import epubLogo from "../../assets/epub_icon_wikimedia.svg";
import pdfLogo from "../../assets/pdf_icon_wikimedia.svg";
import odfLogo from "../../assets/odf_logo_wikimedia.png";
import { Link } from "react-router-dom";
import * as ß from "./styles";

const HomeScreen = () => (
  <div css={ß.root}>
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ marginBottom: 6 }}>{`The Csound FLOSS Manual`}</h1>
      <h3 style={{ marginTop: 0, fontWeight: 100 }}>
        {process.env.REACT_APP_CSOUND_FLOSS_VERSION
          ? `Version: ${process.env.REACT_APP_CSOUND_FLOSS_VERSION}`
          : ""}
      </h3>
    </div>
    <Link to={`/introduction/preface`}>
      <img
        src={wasmLogo}
        alt="WebAssembly Logo"
        style={{ width: 48, marginBottom: -6 }}
      />
      <p
        style={{ fontSize: 42, fontWeight: 100, lineHeight: 1.2 }}
      >{`Read the interactive book`}</p>
    </Link>
    <hr style={{ backgroundColor: "#333", height: 2 }} />
    <div css={ß.grid}>
      <a
        href={`/build/csound-flossmanual-${process.env
          .REACT_APP_CSOUND_FLOSS_VERSION || "dev"}.epub`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={epubLogo} alt="epub version" style={{ width: 24 }} />
        <p>{`Download the EPUB version`}</p>
      </a>
      <a
        href={`/build/csound-flossmanual-${process.env
          .REACT_APP_CSOUND_FLOSS_VERSION || "dev"}.pdf`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={pdfLogo} alt="pdf version" style={{ width: 24 }} />
        <p>{`Download the PDF version`}</p>
      </a>
      <a
        href={`/build/csound-flossmanual-${process.env
          .REACT_APP_CSOUND_FLOSS_VERSION || "dev"}.odt`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={odfLogo} alt="odf version" style={{ width: 24 }} />
        <p>{`Download OpenDocument version`}</p>
      </a>
    </div>
    <div>
      <hr style={{ backgroundColor: "#333", height: 2 }} />
      <a
        href={`https://csound-flossmanual.github.io`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>{`List of all releases`}</p>
      </a>
    </div>
  </div>
);

export default HomeScreen;
