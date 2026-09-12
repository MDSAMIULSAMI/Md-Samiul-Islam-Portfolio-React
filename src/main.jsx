import React from "react";
import { createRoot } from "react-dom/client";

// Fonts are self hosted. Loading them from fonts.googleapis.com means a third
// party request that privacy extensions and ad blockers routinely block
// (ERR_BLOCKED_BY_CLIENT), which would drop the site back to system fonts.
// Each @font-face carries a unicode-range, so only the needed subset downloads.
import "@fontsource-variable/sora/wght.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";

// Sizing rules the smooth scroller needs on <html>/<body>. Imported before
// index.css so our own base layer stays the last word.
import "lenis/dist/lenis.css";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
