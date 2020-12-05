/** @jsxRuntime classic */
/** @jsx jsx */
import { css } from "@emotion/react";

export const hr = css`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const shadow = css`
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const rootStyle = css`
  ${shadow}
  background-color: white;
  border: 1px solid #d9d9d9;
  margin-top: 48px;
  margin-left: 12px;
  padding-bottom: 12px;
  padding-top: 12px;
`;

export const orderedListStyle = css`
  overflow: hidden;
  padding-left: 36px;
  margin: 0;
`;

export const chapterList = css`
  padding: 0;
  padding-right: 6px;
  padding-left: 12px;
  padding-top: 6px;
  margin: 0;
  list-style-type: upper-alpha;
`;

export const selectContainer = css`
  width: 260px;
  margin-right: 24px;
`;

export const buttonNav = css`
  ${shadow}
  padding: 12px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 12px;
  margin-left: 12px;
  color: #6f519b;
  background-color: white;

  & > a {
    color: #6f519b !important;
    display: flex;
    flex-direction: row;
    &:hover {
      font-weight: 700;
    }
  }
  & > a > p > span {
    position: absolute;
    top: -1px;
    margin-left: -20px;
    color: #6f519b !important;
    font-size: 18px;
    color: black;
  }
  & > a > p {
    position: relative;
    line-height: 1;
    color: #6f519b !important;
    font-size: 16px;
    margin: 0;
    margin-left: 24px;
    &:nth-of-type(2) {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const clear = css`
  overflow: hidden;
  flex: 0 0 240px;
  height: 100vh;
  position: relative;
  & > div {
    position: fixed;
    max-width: 240px;
  }
`;

export const chapterZeroItem = css`
  display: block;
  color: #6f519b !important;
  font-weight: 500;
  margin: 0;
  padding: 0;
  padding-left: 20px;
  padding-top: 6px;
  padding-bottom: 6px;
  &:hover {
    & > p {
      text-decoration: underline;
    }
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.03);
  }
  & > p {
    font-size: 16px;
    line-height: 20px;
    margin: 0;
  }
`;

export const chapterItem = css`
  font-weight: 500;
  color: #6f519b !important;
  position: relative;
  & > a {
    color: #6f519b !important;
    margin: 0;
    display: block;
  }
  &:hover {
    cursor: pointer;
    & > a {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }

  a:hover {
    background-color: rgba(0, 0, 0, 0.03);
    & > p {
      text-decoration: underline;
    }
  }

  & > a > p {
    font-size: 16px;
    line-height: 20px;
    margin: 0;
  }
`;

export const subSectionLi = css`
  list-style: none;
  margin: 0;
  p {
    font-weight: 500;
    color: #6f519b !important;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
  }
  p:hover {
    text-decoration: underline;
  }
`;
