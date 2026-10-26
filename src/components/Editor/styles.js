/** @jsxRuntime classic */
/** @jsx jsx */
import { css } from "@emotion/react";

export const codeMirror = (isCsd) => css`
  margin-top: 12px;
  white-space: pre-wrap;
  margin-bottom: 24px;
  & .CodeMirror-cursors {
    display: ${isCsd ? "inherit" : "none!important"};
  }
  & .CodeMirror-wrap pre {
    word-break: break-word;
  }
  & .CodeMirror-scroll {
    height: auto !important;
    overflow: hidden !important;
  }
  & .react-codemirror2 > div {
    background: #f5f2f0;
    height: auto;
    border: 1px solid #ccc;
  }
  & .CodeMirror-gutter-elt {
    color: #75787b !important;
    margin-left: 6px;
  }
`;

export const readOnly = css`
  user-select: none;
`;
