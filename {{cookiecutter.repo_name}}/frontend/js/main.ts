/* eslint-disable import/first */

// @ts-expect-error // this whole system is broken w/ vite
if (import.meta.env.MODE !== "development") {
  // // @ts-expect-error  // this whole system is broken w/ vite
  // import("vite/modulepreload-polyfill"); // eslint-disable-line import/no-unresolved
  // https://github.com/vitejs/vite/issues/4786
}

// Import our CSS
import "@/css/app-base.css";
import "@/css/app-components.css";
import "@/css/app-utilities.css";
