/** @jsxRuntime classic */
/** @jsx jsx */
import { css } from "@emotion/react";

const shadow = css`
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const sticky = css`
  position: absolute;
  z-index: 99999;
  pointer-events: none;
  & > div {
    position: relative;
  }
  & > div > div {
    width: 100vw !important;
    height: 100vh !important;
  }
`;

export const container = css`
  ${shadow}
  background-color: #f5f2f0;
  pointer-events: bounding-box;
  padding-top: 22px;
  cursor: initial !important;
`;

export const closeIconContainer = css`
  position: absolute;
  fill: white;
  right: 12px;
  top: 3px;
  z-index: 999999;
  cursor: pointer;
`;

export const windowBar = css`
  cursor: move;
  height: 28px;
  padding: 0 12px;
  color: #f5f2f0;
  background-color: #6f519b;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
`;

export const body = css`
  z-index: 1;
  display: flex;
  flex-direction: column;
  pointer-events: all;
  border: none !important;
  box-sizing: content-box;
  height: calc(100% - 18px);
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 12px;
  margin: 0;
  &::-webkit-scrollbar {
    pointer-events: all !important;
    z-index: 2;
    width: 5px;
    height: 8px;
    background-color: #aaa;
  }
`;
