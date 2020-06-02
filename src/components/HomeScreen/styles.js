/** @jsx jsx */
import { css } from "@emotion/core";

export const root = css`
  max-width: 800px;
  min-width: 360px;
  img {
    font-align: center;
    display: inline-block;
    margin-right: 6px;
  }
  a,
  p {
    color: #333;
    font-align: center;
    display: inline-block;
    font-size: 20px;
    white-space: nowrap;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const grid = css`
  display: grid;
  align-items: stretch;
  // grid-template-rows: 1fr auto;
  grid-template-columns: 1fr repeat(auto-fit, minmax(360px, 1fr));
`;
