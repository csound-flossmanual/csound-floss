/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
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

const setLocalStorageState = (enabled) =>
  typeof window.localStorage !== "undefined" &&
  typeof window.localStorage.setItem === "function" &&
  window.localStorage.setItem("dark_mode_enabled", enabled ? "1" : "0");

const injectPngBackgroundCSS = () => {
  const styleId = "png-dark-mode-background";
  let style = document.getElementById(styleId);

  if (!style) {
    style = document.createElement("style");
    style.id = styleId;
    document.head.appendChild(style);
    // Add data attribute to prevent DarkReader from processing this style
    style.setAttribute("data-darkreader-inline-bgcolor", "");
  }

  // Create wrapper divs for PNG images instead of CSS
  const pngImages = document.querySelectorAll(
    'img[src$=".png"], img[src*=".png?"], img[src*=".png#"]'
  );

  pngImages.forEach((img) => {
    // Skip if already wrapped
    if (
      img.parentElement &&
      img.parentElement.classList.contains("png-white-bg-wrapper")
    ) {
      return;
    }

    // Create wrapper div
    const wrapper = document.createElement("div");
    wrapper.className = "png-white-bg-wrapper";
    wrapper.style.cssText = `
      display: inline-block !important;
      background: white !important;
      padding: 8px !important;
      border-radius: 4px !important;
      border: 1px solid #ccc !important;
      box-sizing: border-box !important;
      margin: 24px auto !important;
    `;

    // Add DarkReader ignore attribute
    wrapper.setAttribute("data-darkreader-ignore", "");

    // Wrap the image
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    // Reset image styles
    img.style.cssText = `
      display: block !important;
      margin: 0 !important;
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
    `;
  });
};

const removePngBackgroundCSS = () => {
  // Remove wrapper divs and restore original image placement
  const wrappers = document.querySelectorAll(".png-white-bg-wrapper");

  wrappers.forEach((wrapper) => {
    const img = wrapper.querySelector("img");
    if (img) {
      // Restore original image styles
      img.style.cssText = `
        display: block !important;
        margin: 24px auto !important;
        max-width: 100% !important;
        border: 0 !important;
      `;

      // Move image back to original position
      wrapper.parentNode.insertBefore(img, wrapper);
    }

    // Remove the wrapper
    wrapper.remove();
  });

  // Also remove any leftover style element
  const styleId = "png-dark-mode-background";
  const style = document.getElementById(styleId);
  if (style) {
    style.remove();
  }
};

const DarkModeToggle = () => {
  const [enabled, setEnabled] = React.useState(getLocalStorageVal());

  React.useEffect(() => {
    if (getLocalStorageVal()) {
      enableDynamicTheme();
      setEnabled(true);
      // Add PNG background CSS after a short delay to ensure DarkReader is active
      setTimeout(injectPngBackgroundCSS, 100);
    }
    // eslint-disable-next-line
  }, []);

  const handleToggle = () => {
    if (enabled) {
      setEnabled(false);
      disableDynamicTheme();
      setLocalStorageState(false);
      removePngBackgroundCSS();
    } else {
      setEnabled(true);
      enableDynamicTheme();
      setLocalStorageState(true);
      // Add PNG background CSS after a short delay to ensure DarkReader is active
      setTimeout(injectPngBackgroundCSS, 100);
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
