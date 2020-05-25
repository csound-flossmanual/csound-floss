/** @jsx jsx */
import { css } from "@emotion/core";

export const main = css`
  padding: 48px 12px;
  position: relative;
  max-width: calc(100% - 240px - 24px);
  & > div {
    background-color: #fff;
    margin-right: auto;
    margin-left: auto;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }

  @media (min-width: 900px) {
    & {
      padding: 48px 72px;
    }
    & > div {
      max-width: 1000px;
      padding: 50px;
    }
  }

  @media (min-width: 650px) {
    & {
      padding: 48px 32px;
      max-width: calc(100% - 240px - 64px);
    }
    & > div {
      padding: 32px;
    }
  }
`;

export const mainMobile = css`
  @media {
    width: 100%;
    padding: 12px;
  }
  & > div {
    background-color: #fff;
    margin-right: auto;
    margin-left: auto;
    padding: 32px;
  }
`;

export const loadingSpinner = css`
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: auto 0;
  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
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

export const alternativeDists = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
  p {
    font-size: 20px;
    text-decoration: underline;
  }
`;
