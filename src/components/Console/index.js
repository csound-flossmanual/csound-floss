/** @jsx jsx */
import { jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import StickyEl from "../../vendor/react-sticky-el.min.js";
import CloseIcon from "../../assets/close.svg";
import useCsound from "../../context";
import { Rnd } from "react-rnd";
import * as ß from "./styles";

const initialHeight = 500;
const initialWidth = 300;

const Console = () => {
  const [{ logs, logDialogOpen }, csoundDispatch] = useCsound();

  const preRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      try {
        preRef.current.scrollTop = preRef.current.scrollHeight;
      } catch (e) {}
    }, 1);
  }, [logs, logDialogOpen]);

  return (
    logDialogOpen && (
      <div css={ß.sticky}>
        <StickyEl bottomOffset={300}>
          <Rnd
            css={ß.container}
            default={{
              x: window.innerWidth - initialWidth * 1.75,
              y: window.innerHeight - initialHeight / 2.15,
              width: 500,
              height: 190,
            }}
            minWidth={50}
            minHeight={50}
            bounds="parent"
          >
            <span
              onClick={() => csoundDispatch({ type: "CLOSE_LOG_DIALOG" })}
              css={ß.closeIconContainer}
            >
              <img alt="close" src={CloseIcon} />
            </span>
            <div css={ß.windowBar}>
              <strong>{"Csound WebAssembly console"}</strong>
            </div>

            <pre css={ß.pre} ref={preRef}>
              {logs.map((log, index) => (
                <span key={index}>{`${log}\n`}</span>
              ))}
            </pre>
          </Rnd>
        </StickyEl>
      </div>
    )
  );
};

export default Console;
