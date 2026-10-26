let loading;

// MathJax 4 is loaded once, only when a chapter contains an equation.
export function loadMathJax() {
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      window.MathJax = { startup: { typeset: false } };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-chtml.js";
      script.async = true;
      script.onload = () =>
        window.MathJax.startup.promise.then(
          () => resolve(window.MathJax),
          reject,
        );
      script.onerror = () => {
        script.remove();
        loading = undefined;
        reject(new Error("Could not load MathJax"));
      };
      document.head.append(script);
    });
  }
  return loading;
}
