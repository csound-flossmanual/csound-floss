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

export const controllers = css`
  position: relative;
  display: flex;
  flex-direction: row;
  & > button {
    width: 40px;
    height: 40px;
    padding: 3px;
    background-color: white;
    margin: 0;
    margin-bottom: 3px;
    overflow: hidden;
    & > img {
      filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg)
        brightness(95%) contrast(80%);
    }
    &:disabled {
      background-color: #aaa;
      & > img {
        filter: invert(48%) sepia(13%) hue-rotate(130deg);
      }
    }
  }
`;

export const playLoadingSpinner = css`
  position: absolute;
  left: -2px;
  top: -2px;
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: auto 0;
  &:after {
    content: " ";
    display: block;
    width: 28px;
    height: 28px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #6f519b;
    border-color: #6f519b transparent #6f519b transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
