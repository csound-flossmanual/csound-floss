import { EditorView } from "@codemirror/view";
import { layers } from "../../constants/layers";

// Match the site's light background; DarkReader adapts these colors in dark mode.
export const csoundTheme = EditorView.theme({
  ".cm-content .cm-csoundBuiltinOpcode, .cm-content .cm-csoundBuiltinOpcode *":
    {
      color: "#6f4200",
    },
  ".cm-content .cm-csoundUserOpcode, .cm-content .cm-csoundUserOpcode *": {
    color: "#00695c",
  },
  ".cm-content .cm-csoundOpcodeOutput, .cm-content .cm-csoundOpcodeOutput *, .cm-content .cm-csoundOpcodeInput, .cm-content .cm-csoundOpcodeInput *, .cm-content .cm-csoundInstrumentName, .cm-content .cm-csoundInstrumentName *":
    {
      color: "#005a8d",
    },
  ".cm-content .cm-csoundPField, .cm-content .cm-csoundPField *": {
    color: "#805000",
  },
  ".cm-content .cm-csoundTypeAnnotation, .cm-content .cm-csoundTypeAnnotation *":
    {
      color: "#7d368a",
    },
  ".cm-content .cm-csoundScoreOpcodeType, .cm-content .cm-csoundScoreOpcodeType *":
    {
      color: "#245787",
    },
  ".cm-content .cm-csoundScoreNumber, .cm-content .cm-csoundScoreNumber *": {
    color: "#27613c",
  },
  // Hover content sits inside CodeMirror's shared tooltip host. The host owns
  // the height constraint, background and scrolling, not the inner body.
  ".cm-tooltip-hover:has(> .cm-csoundHoverTooltip)": {
    zIndex: layers.opcodeHelp,
    backgroundColor: "#faf9fc",
    color: "#302738",
    border: "1px solid #cfc5dd",
    borderRadius: "7px",
    boxShadow: "0 6px 24px #36244926",
    width: "max-content",
    maxWidth: "min(560px, calc(100vw - 24px))",
    maxHeight: "min(520px, 70dvh)",
    boxSizing: "border-box",
    overflowX: "hidden",
    overflowY: "auto",
    overscrollBehavior: "contain",
    fontFamily: "system-ui, sans-serif",
    fontSize: "13px",
    lineHeight: "1.5",
    whiteSpace: "normal",
  },
  ".cm-csoundHoverTooltip__body": {
    display: "block",
    padding: "0",
    minWidth: "0",
  },
  ".cm-csoundHoverTooltip__header": {
    position: "sticky",
    top: "0",
    zIndex: "1",
    padding: "10px 14px",
    gap: "12px",
    backgroundColor: "#f0ebf6",
    borderBottom: "1px solid #ded5e8",
  },
  ".cm-csoundHoverTooltip__title": {
    color: "#5c4084",
    fontFamily: "ui-monospace, monospace",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "1.3",
    letterSpacing: "normal",
    overflowWrap: "anywhere",
  },
  ".cm-csoundHoverTooltip__badge": {
    color: "#655572",
    fontFamily: "inherit",
    fontSize: "11px",
    textTransform: "none",
    letterSpacing: "normal",
  },
  ".cm-csoundHoverTooltip__description": {
    margin: "10px 14px 8px",
    color: "inherit",
    fontSize: "13px",
    lineHeight: "1.5",
    overflowWrap: "anywhere",
  },
  ".cm-csoundHoverTooltip__meta": {
    display: "block",
    margin: "0 14px 12px",
    color: "#655a70",
    fontSize: "11px",
    lineHeight: "1.6",
    whiteSpace: "pre-line",
    overflowWrap: "anywhere",
  },
  ".cm-csoundHoverTooltip__deprecated": {
    margin: "8px 14px 0",
    color: "#a0293d",
    fontWeight: "700",
  },
  ".cm-csoundHoverTooltip__section": {
    gridTemplateColumns: "76px minmax(0, 1fr)",
    alignItems: "start",
    gap: "8px",
    padding: "10px 14px",
    borderTop: "1px solid #e4dfea",
    minWidth: "0",
  },
  ".cm-csoundHoverTooltip__sectionLabel": {
    paddingTop: "6px",
    color: "#655572",
    fontFamily: "inherit",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "none",
    letterSpacing: "normal",
  },
  ".cm-csoundHoverTooltip__code": {
    margin: "0",
    padding: "6px 8px",
    border: "0",
    borderRadius: "3px",
    backgroundColor: "#f0edf4",
    color: "#302738",
    fontFamily: "ui-monospace, monospace",
    fontSize: "12px",
    lineHeight: "1.6",
    minWidth: "0",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },
  "@media (max-width: 480px)": {
    ".cm-csoundHoverTooltip__section": {
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: "4px",
    },
    ".cm-csoundHoverTooltip__sectionLabel": { paddingTop: "0" },
  },
});
