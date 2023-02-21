/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import * as R from "ramda";
import { Rnd } from "react-rnd";
import { Parser as acornParser } from "acorn";
import acornJsx from "acorn-jsx";
import StickyEl from "../../vendor/react-sticky-el.min.js";
import RcSlider from "rc-slider";
import CloseIcon from "../../assets/close.svg";
import useCsound from "../../CsoundContext";
import * as ß from "./styles";

const initialHeight = 500;
const initialWidth = 300;

const jsxParser = acornParser.extend(
  acornJsx({ allowNamespacedObjects: true })
);

const GuiRenderer = () => {
  const [{ guiCode, guiDialogOpen, libcsound, isPlaying }, csoundDispatch] =
    useCsound();

  console.log(jsxParser.parse(guiCode));
  const jsxJson = []; //guiCode ? jsxToJson(guiCode) : [];
  const [lastIsPlaying, setLastIsPlaying] = React.useState(true);
  const [channelStates, setChannelStates] = React.useState({});

  React.useEffect(() => {
    if (!isPlaying) {
      setChannelStates({});
    }
    if (isPlaying === lastIsPlaying) {
      setLastIsPlaying(!isPlaying);
    }
  }, [isPlaying, lastIsPlaying, setLastIsPlaying, setChannelStates]);

  const GuiElements = [];

  if (Array.isArray(jsxJson) && jsxJson.length > 0) {
    let index = 0;
    for (const el of jsxJson[0]) {
      index += 1;
      if (Array.isArray(el)) {
        const componentType = el[0];
        const componentAttrs = el[1];

        if (componentType === "Slider") {
          const {
            id = "undefined",
            name = componentAttrs.id || "undefined",
            min = 0,
            max = 100,
            defaultValue = componentAttrs.min || 0,
          } = componentAttrs;

          if (
            isPlaying &&
            typeof channelStates[id] !== "number" &&
            typeof defaultValue === "number"
          ) {
            setChannelStates(R.assoc(id, defaultValue)(channelStates));
            libcsound?.setControlChannel(id, defaultValue);
          }

          GuiElements.push(
            <div key={index}>
              <b>{`${name}: ${channelStates[id] || defaultValue || ""}`}</b>
              <RcSlider
                id={id}
                name={name}
                defaultValue={defaultValue}
                min={min}
                max={max}
                onChange={(val) => {
                  setChannelStates(R.assoc(id, val)(channelStates));
                  libcsound?.setControlChannel(id, val);
                }}
              />
            </div>
          );
        }
      }
    }
  }

  return !guiDialogOpen ? (
    <></>
  ) : (
    <div css={ß.sticky}>
      <StickyEl topOffset={300}>
        <Rnd
          css={ß.container}
          cancel=".flossmanual-gui-body"
          default={{
            x: window.innerWidth - initialWidth * 1.75,
            y: window.innerHeight - initialHeight * 1.5,
            width: 500,
            height: 190,
          }}
          enableUserSelectHack={false}
          minWidth={120}
          minHeight={120}
          bounds="parent"
        >
          <div
            css={ß.body}
            className="flossmanual-gui-body"
            key={isPlaying ? "playing" : "not-playing"}
          >
            {GuiElements.length > 0 && GuiElements}
          </div>
          <span
            onClick={() => csoundDispatch({ type: "CLOSE_LOG_DIALOG" })}
            css={ß.closeIconContainer}
          >
            <img alt="close" src={CloseIcon} />
          </span>
          <div css={ß.windowBar}>
            <strong>{"FlossmanualGUI"}</strong>
          </div>
        </Rnd>
      </StickyEl>
    </div>
  );
};

export default GuiRenderer;
