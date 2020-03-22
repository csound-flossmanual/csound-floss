/** @jsx jsx */
import { css } from "@emotion/core";

const shadow = css`
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const sticky = css`
  position: absolute;
  z-index: 99999;
  & > div {
    position: absolute;
  }
  & > div > div {
    width: 100vw !important;
    height: 100vh !important;
    pointer-events: none;
  }
`;

export const container = css`
  ${shadow}
  background-color: #f5f2f0;
  pointer-events: all;
  padding-top: 22px;
`;

export const windowBar = css`
  padding: 0 12px;
  color: #f5f2f0;
  background-color: #6f519b;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
`;

export const pre = css`
  border: none !important;
  box-sizing: content-box;
  position: relative;
  height: calc(100% - 18px);
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 6px;
  margin: 0;
  &::-webkit-scrollbar {
    pointer-events: all !important;
    z-index: 2;
    width: 5px;
    height: 8px;
    background-color: #aaa;
  }
`;
