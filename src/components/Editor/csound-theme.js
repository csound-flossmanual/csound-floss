import { EditorView } from "@codemirror/view";

// Match the site's light background; DarkReader adapts these colors in dark mode.
export const csoundTheme = EditorView.theme({
  ".cm-content .cm-csoundBuiltinOpcode, .cm-content .cm-csoundBuiltinOpcode *": {
    color: "#6f4200",
  },
  ".cm-content .cm-csoundUserOpcode, .cm-content .cm-csoundUserOpcode *": {
    color: "#00695c",
  },
  ".cm-content .cm-csoundOpcodeOutput, .cm-content .cm-csoundOpcodeOutput *, .cm-content .cm-csoundOpcodeInput, .cm-content .cm-csoundOpcodeInput *, .cm-content .cm-csoundInstrumentName, .cm-content .cm-csoundInstrumentName *": {
    color: "#005a8d",
  },
  ".cm-content .cm-csoundPField, .cm-content .cm-csoundPField *": {
    color: "#805000",
  },
  ".cm-content .cm-csoundTypeAnnotation, .cm-content .cm-csoundTypeAnnotation *": {
    color: "#7d368a",
  },
  ".cm-content .cm-csoundScoreOpcodeType, .cm-content .cm-csoundScoreOpcodeType *": {
    color: "#245787",
  },
  ".cm-content .cm-csoundScoreNumber, .cm-content .cm-csoundScoreNumber *": {
    color: "#27613c",
  },
  ".cm-tooltip.cm-csoundHoverTooltip": {
    backgroundColor: "#fff",
    color: "#1f2937",
    borderColor: "#9ca3af",
    maxHeight: "min(32rem, 70vh)",
    overflowY: "auto",
  },
  ".cm-csoundHoverTooltip__description": { color: "inherit" },
  ".cm-csoundHoverTooltip__badge, .cm-csoundHoverTooltip__meta, .cm-csoundHoverTooltip__sectionLabel": {
    color: "#4b5563",
  },
  ".cm-csoundHoverTooltip__deprecated": { color: "#b91c1c" },
  ".cm-csoundHoverTooltip__code": {
    backgroundColor: "#f3f4f6",
    color: "#1f2937",
  },
});
