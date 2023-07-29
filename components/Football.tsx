import React, { useEffect } from "react";

const WidgetLoader: React.FC = () => {
  useEffect(() => {
    (function (a, b, c, d, e, f, g, h, i) {
      a[e] ||
        (i = a[e] =
          function () {
            (a[e].q = a[e].q || []).push(arguments);
          });
      i.l = 1 * new Date();
      i.o = f;
      g = b.createElement(c);
      h = b.getElementsByTagName(c)[0];
      g.async = 1;
      g.src = d;
      g.setAttribute("n", e);
      h.parentNode.insertBefore(g, h);
    })(
      window,
      document,
      "script",
      "https://widgets.sir.sportradar.com/sportradar/widgetloader",
      "SIR",
      {
        language: "en", // SIR global options
      }
    );
  }, []);

  return null; // or return any JSX/HTML elements you want to render alongside the widget loader
};

export default WidgetLoader;
