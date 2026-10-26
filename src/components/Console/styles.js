import { css } from "@emotion/react";

export const controls = css`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  .transport {
    display: flex;
    gap: 6px;
  }
  & button {
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    min-height: 40px;
    padding: 0 12px;
    gap: 7px;
    border: 1px solid #d8d2e0;
    border-radius: 7px;
    color: #4e3a6a;
    background: #fff;
    cursor: pointer;
    transition:
      background 120ms,
      border-color 120ms;
  }
  button:hover:not(:disabled) {
    background: #f0ebf7;
    border-color: #6f519b;
  }
  button:focus-visible {
    outline: 3px solid #8c6db6;
    outline-offset: 2px;
  }
  button:disabled {
    opacity: 0.45;
    cursor: default;
  }
  button.play {
    background: #6f519b;
    color: white;
    border-color: #6f519b;
  }
  button.play:hover:not(:disabled) {
    background: #59417e;
  }
  button[aria-pressed="true"] {
    background: #eee7f7;
    border-color: #8b6bb4;
  }
  &.editor-controls {
    margin-bottom: 6px;
  }
  .download {
    margin-left: 4px;
  }
  .loading {
    animation: console-spin 1s linear infinite;
  }
  @keyframes console-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
    .loading {
      animation: none;
    }
  }
`;
export const layer = css`
  position: fixed;
  inset: 0;
  z-index: 1200;
  pointer-events: none;
`;
export const panel = css`
  pointer-events: auto;
  display: flex !important;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: nowrap;
  gap: 0;
  color: #302738;
  background: #faf9fc;
  border: 1px solid #cfc5dd;
  border-radius: 14px;
  box-shadow:
    0 12px 48px #36244930,
    0 2px 8px #36244918;
  font-family: system-ui, sans-serif;
  font-size: 13px;
  overflow: hidden;
  .console-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px 8px;
    flex-shrink: 0;
    cursor: grab;
  }
  .console-header:active {
    cursor: grabbing;
  }
  .console-mark {
    color: #6f519b;
    background: #eee8f5;
    border-radius: 8px;
    padding: 7px;
    flex-shrink: 0;
  }
  .console-title {
    min-width: 0;
    flex: 1;
  }
  .console-title small {
    display: block;
    color: #72677c;
    font-size: 11px;
    margin-bottom: 3px;
  }
  .console-title strong {
    display: block;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .icon-button {
    padding: 0;
    width: 36px;
    min-height: 36px;
    border: 0;
    background: transparent;
  }
  .transport-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 4px 14px 12px;
    flex-shrink: 0;
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #655a70;
  }
  .status::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #a598b4;
  }
  .status[data-playing="true"]::before {
    background: #6f519b;
    box-shadow: 0 0 0 3px #6f519b22;
  }
  .console-body {
    overflow: auto;
    min-height: 0;
    flex: 1;
    overscroll-behavior: contain;
  }
  .log-heading {
    padding: 8px 14px 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .log-heading strong {
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #756b80;
  }
  && .log-heading button {
    height: 28px;
    min-height: 28px;
    font-size: 10px;
    padding: 0 8px;
  }
  .log {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    margin: 0 14px 12px;
    padding: 10px 12px;
    height: 100px;
    min-height: 90px;
    overflow: auto;
    border: 1px solid #e4dfea;
    border-radius: 7px;
    background: #f1eef5;
    color: #4b4059;
    font:
      11px/1.55 ui-monospace,
      monospace;
  }
  .log.empty {
    display: flex;
    align-items: center;
    color: #756b80;
  }
  && .tool-panel {
    padding: 12px 14px;
    margin: 0;
    border-top: 1px solid #e4dfea;
  }
  .tool-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
  }
  .tool-heading strong {
    font-size: 12px;
  }
  && .tool-heading button {
    font-size: 11px;
    height: 30px;
    min-height: 30px;
    padding: 0 8px;
  }
  .hint {
    font-size: 10px;
    color: #756b80;
    margin: 8px 0 0;
    line-height: 1.5;
  }
  .tools {
    padding: 10px 14px;
    background: #f5f2f8;
    border-top: 1px solid #e4dfea;
    flex-shrink: 0;
  }
  .tools button {
    flex: 1;
  }
  @media (max-width: 600px) {
    border-radius: 12px;
    .console-header {
      padding-top: 10px;
    }
  }
`;
