/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import wasmLogo from "../../assets/wasm_wikimedia.svg";
import epubLogo from "../../assets/epub_icon_wikimedia.svg";
import pdfLogo from "../../assets/pdf_icon_wikimedia.svg";
import odfLogo from "../../assets/odf_logo_wikimedia.png";
import { Link } from "react-router-dom";
import * as ß from "../HomeScreen/styles";

const HomeScreenFr = () => (
  <div css={ß.root}>
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ marginBottom: 6 }}>{`Le Manuel FLOSS de Csound`}</h1>
      <h3 style={{ marginTop: 0, fontWeight: 100 }}>
        {process.env.REACT_APP_CSOUND_FLOSS_VERSION
          ? `Version: ${process.env.REACT_APP_CSOUND_FLOSS_VERSION}`
          : ""}
      </h3>
    </div>
    <Link to={`/fr/premiers-pas/gs-01`} reloadDocument>
      <img
        src={wasmLogo}
        alt="Logo WebAssembly"
        style={{ width: 48, marginBottom: -6 }}
      />
      <p
        style={{ fontSize: 42, fontWeight: 100, lineHeight: 1.2 }}
      >{`Lire le livre interactif`}</p>
    </Link>
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Link to={`/`} reloadDocument>
        <p
          style={{
            fontSize: 24,
            fontWeight: 100,
            lineHeight: 1.2,
            color: "#6f519b",
          }}
        >{`Read the book in English`}</p>
      </Link>
    </div>
    <hr style={{ backgroundColor: "#333", height: 2 }} />
    <div css={ß.grid}>
      <a
        href={`/build/csound-flossmanual-fr-${
          process.env.REACT_APP_CSOUND_FLOSS_VERSION || "dev"
        }.epub`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={epubLogo}
          alt="version epub française"
          style={{ width: 24 }}
        />
        <p>{`Télécharger la version EPUB française`}</p>
      </a>
      <a
        href={`/build/csound-flossmanual-fr-${
          process.env.REACT_APP_CSOUND_FLOSS_VERSION || "dev"
        }.pdf`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={pdfLogo} alt="version pdf française" style={{ width: 24 }} />
        <p>{`Télécharger la version PDF française`}</p>
      </a>
      <a
        href={`/build/csound-flossmanual-fr-${
          process.env.REACT_APP_CSOUND_FLOSS_VERSION || "dev"
        }.odt`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={odfLogo} alt="version odf française" style={{ width: 24 }} />
        <p>{`Télécharger la version OpenDocument française`}</p>
      </a>
    </div>
    <div>
      <hr style={{ backgroundColor: "#333", height: 2 }} />
      <a
        href={`https://csound-flossmanual.github.io`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>{`Liste et fichiers zip de toutes les versions et matériaux`}</p>
      </a>
    </div>
  </div>
);

export default HomeScreenFr;
