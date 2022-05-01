// Import our CSS
import "@/css/app-base.css";
import "@/css/app-components.css";
import "@/css/app-utilities.css";
import focus from "@alpinejs/focus";

import "htmx.org";
import Alpine from "alpinejs";

import "./components/modal";
import "./components/flyout";
import "./links";

// @ts-expect-error // needs to declare that htmx lives on window, auto added by import
const { htmx } = window; // eslint-disable-line  @typescript-eslint/no-unused-vars

// @ts-expect-error // this whole system is broken w/ vite
if (import.meta.env.MODE !== "development") {
  // // @ts-expect-error  // this whole system is broken w/ vite
  // import("vite/modulepreload-polyfill"); // eslint-disable-line import/no-unresolved
  // https://github.com/vitejs/vite/issues/4786
}

// TODO: when  https://github.com/vitejs/vite/issues/5808 is fixed, setup HMR for html through htmx.ajax
// if (import.meta.hot) {
//   import.meta.hot.on("special-update", (data) => {});
// }

window.Alpine = Alpine;
Alpine.plugin(focus);
Alpine.start();
