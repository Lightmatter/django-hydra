import focus from "@alpinejs/focus";
import mask from "@alpinejs/mask";

import "htmx.org";
import Alpine from "alpinejs";
import Cookies from "js-cookie";
import "./components/modal";
import "./components/flyout";
import "./links";

if (import.meta.env.MODE !== "development") {
  // // @ts-expect-error  // this whole system is broken w/ vite
  // import("vite/modulepreload-polyfill"); // eslint-disable-line import/no-unresolved
  // https://github.com/vitejs/vite/issues/4786
}

// @ts-expect-error // needs to declare that htmx lives on window, auto added by import
const { htmx } = window; // eslint-disable-line  @typescript-eslint/no-unused-vars

htmx.defineExtension("get-csrf", {
  onEvent: function (name: string, evt: any) {
    if (name === "htmx:configRequest") {
      evt.detail.headers["X-CSRFToken"] = Cookies.get("{{cookiecutter.repo_name}}_csrftoken");
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.on("template-hmr", () => {
    const dest = document.location.href;
    htmx.ajax("GET", dest, { target: "body", swap: "morphdom" });
  });
}

window.Alpine = Alpine;
Alpine.plugin(focus);
Alpine.plugin(mask)
Alpine.start();
