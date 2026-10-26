import { MathJax, MathJaxContext } from "better-react-mathjax";

const Provider = ({ children }) => <MathJaxContext>{children}</MathJaxContext>;
const Node = ({ formula, inline }) => (
  <MathJax inline={Boolean(inline)}>
    {inline ? `\\(${formula}\\)` : `\\[${formula}\\]`}
  </MathJax>
);

export default { Provider, Node };
