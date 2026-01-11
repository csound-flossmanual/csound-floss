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
import { getRouteConstants } from "../../constants/routes";

const HomeScreenFa = () => (
  <div css={ß.root}>
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ marginBottom: 6 }}>{`راهنمای FLOSS Csound`}</h1>
      <h3 style={{ marginTop: 0, fontWeight: 100 }}>
        {process.env.REACT_APP_CSOUND_FLOSS_VERSION
          ? `نسخه: ${process.env.REACT_APP_CSOUND_FLOSS_VERSION}`
          : ""}
      </h3>
    </div>
    <Link to={getRouteConstants("fa").defaultContentRoute} reloadDocument>
      <img
        src={wasmLogo}
        alt="لوگو WebAssembly"
        style={{ width: 48, marginBottom: -6 }}
      />
      <p
        style={{ fontSize: 42, fontWeight: 100, lineHeight: 1.2 }}
      >{`کتاب تعاملی را بخوانید`}</p>
    </Link>
    <div
      style={{
        marginTop: 20,
        marginBottom: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
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
      <Link to={`/fr`} reloadDocument>
        <p
          style={{
            fontSize: 24,
            fontWeight: 100,
            lineHeight: 1.2,
            color: "#6f519b",
          }}
        >{`Lire le livre en français`}</p>
      </Link>
    </div>
    <hr style={{ backgroundColor: "#333", height: 2 }} />
    <div css={ß.grid}>
      <a
        href={`/build/csound-flossmanual-fa-${
          process.env.REACT_APP_CSOUND_FLOSS_VERSION || "dev"
        }.epub`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={epubLogo} alt="نسخه فارسی epub" style={{ width: 24 }} />
        <p>{`دانلود نسخه فارسی EPUB`}</p>
      </a>
      <a
        href={`/build/csound-flossmanual-fa-${
          process.env.REACT_APP_CSOUND_FLOSS_VERSION || "dev"
        }.pdf`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={pdfLogo} alt="نسخه فارسی pdf" style={{ width: 24 }} />
        <p>{`دانلود نسخه فارسی PDF`}</p>
      </a>
      <a
        href={`/build/csound-flossmanual-fa-${
          process.env.REACT_APP_CSOUND_FLOSS_VERSION || "dev"
        }.odt`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={odfLogo} alt="نسخه فارسی odf" style={{ width: 24 }} />
        <p>{`دانلود نسخه فارسی OpenDocument`}</p>
      </a>
    </div>
    <div>
      <hr style={{ backgroundColor: "#333", height: 2 }} />
      <a
        href={`https://csound-flossmanual.github.io`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>{`لیست و فایل‌های فشرده تمام نسخه‌ها و مواد`}</p>
      </a>
    </div>
  </div>
);

export default HomeScreenFa;
