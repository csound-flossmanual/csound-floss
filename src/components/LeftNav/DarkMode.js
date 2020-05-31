/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { equals } from "ramda";
import React from "react";
const {
  enableDynamicTheme,
  disableDynamicTheme,
} = require("../../vendor/darkreader.js");

// https://codepen.io/aaroniker/pen/oaQdQZ
// By: Aaron Iker
const toggleStyle = css`
  cursor: pointer;
  input {
    display: none;
    & + span {
      width: 48px;
      height: 28px;
      border-radius: 14px;
      transition: all 0.3s ease;
      display: block;
      position: relative;
      background: #6f519b;
      box-shadow: 0 8px 16px -1px rgba(111, 81, 155, 0.2);
      &:before,
      &:after {
        content: "";
        display: block;
        position: absolute;
        transition: all 0.3s ease;
      }
      &:before {
        top: 5px;
        left: 5px;
        width: 18px;
        height: 18px;
        border-radius: 9px;
        box-sizing: border-box;
        border: 5px solid #fff;
      }
      &:after {
        top: 5px;
        left: 32px;
        width: 6px;
        height: 18px;
        border-radius: 40%;
        transform-origin: 50% 50%;
        background: #fff;
        opacity: 0;
      }
      &:active {
        transform: scale(0.92);
      }
    }
    &:checked {
      & + span {
        background: #6f519b;
        box-shadow: 0 8px 16px -1px rgba(0, 0, 0, 0.2);
        &:before {
          width: 0px;
          border-radius: 3px;
          margin-left: 27px;
          border-width: 3px;
          background: #fff;
        }
        &:after {
          animation: blobChecked 0.35s linear forwards 0.2s;
        }
      }
    }
    &:not(:checked) {
      & + span {
        &:before {
          animation: blob 0.85s linear forwards 0.2s;
        }
      }
    }
  }
  @keyframes blob {
    0%,
    100% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.12, 0.94);
    }
    60% {
      transform: scale(0.96, 1.06);
    }
  }

  @keyframes blobChecked {
    0% {
      opacity: 1;
      transform: scaleX(1);
    }
    30% {
      transform: scaleX(1.44);
    }
    70% {
      transform: scaleX(1.18);
    }
    50%,
    99% {
      transform: scaleX(1);
      opacity: 1;
    }
    100% {
      transform: scaleX(1);
      opacity: 0;
    }
  }
`;

const toggleContainer = css`
  margin-top: -48px;
  position: absolute;
  height: 24px;
  width: 100%;
  opacity: 0.1;
  &:hover {
    opacity: 1;
  }
`;

const labelStyle = css`
  position: absolute;
  top: 0;
  left: 60px;
  margin-top: 0px;
  font-weight: 700;
  font-size: 18px;
`;

const getLocalStorageVal = () =>
  typeof window.localStorage !== "undefined" &&
  typeof window.localStorage.getItem === "function" &&
  equals(window.localStorage.getItem("dark_mode_enabled"), "1");

const setLocalStorageState = enabled =>
  typeof window.localStorage !== "undefined" &&
  typeof window.localStorage.setItem === "function" &&
  window.localStorage.setItem("dark_mode_enabled", enabled ? "1" : "0");

const DarkModeToggle = () => {
  const [enabled, setEnabled] = React.useState(getLocalStorageVal());

  React.useEffect(() => {
    if (getLocalStorageVal()) {
      enableDynamicTheme();
      setEnabled(true);
    }
    // eslint-disable-next-line
  }, []);

  const handleToggle = () => {
    if (enabled) {
      setEnabled(false);
      disableDynamicTheme();
      setLocalStorageState(false);
    } else {
      setEnabled(true);
      enableDynamicTheme();
      setLocalStorageState(true);
    }
  };

  return (
    <div css={toggleContainer}>
      <label css={toggleStyle}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
        ></input>
        <span />
        <p css={labelStyle}>Dark Mode</p>
      </label>
    </div>
  );
};

export default DarkModeToggle;
