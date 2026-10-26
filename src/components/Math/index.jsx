import { useEffect, useRef } from "react";
import { loadMathJax } from "./loader";

const Provider = ({ children }) => children;
function Node({ formula, inline }) {
  const element = useRef(null);
  useEffect(() => {
    let cancelled = false;
    loadMathJax()
      .then((math) => math.tex2chtmlPromise(formula, { display: !inline }))
      .then((rendered) => {
        if (!cancelled) element.current.replaceChildren(rendered);
      })
      .catch((error) => console.error("Could not render equation", error));
    return () => {
      cancelled = true;
    };
  }, [formula, inline]);
  const Tag = inline ? "span" : "div";
  return <Tag ref={element}>{formula}</Tag>;
}
export default { Provider, Node };
