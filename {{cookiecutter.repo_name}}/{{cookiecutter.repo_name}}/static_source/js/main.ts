import focus from "@alpinejs/focus";
import mask from "@alpinejs/mask";
import ui from "@alpinejs/ui";

import htmx from "htmx.org";
import Alpine from "alpinejs";
import Cookies from "js-cookie";

import "./links.ts";

if (import.meta.env.MODE !== "development") {
  // // @ts-expect-error  // this whole system is broken w/ vite
  // import("vite/modulepreload-polyfill"); // eslint-disable-line import/no-unresolved
  // https://github.com/vitejs/vite/issues/4786
}

htmx.defineExtension("get-csrf", {
  onEvent(name: string, evt: any) {
    if (name === "htmx:configRequest") {
      evt.detail.headers["X-CSRFToken"] = Cookies.get(
        "{{cookiecutter.repo_name}}_csrftoken"
      );
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.on("template-hmr", () => {
    const dest = document.location.href;
    //TODO: Make swap morphdom based
    htmx.ajax("GET", dest, { target: "body" });
  });
}

window.Alpine = Alpine;
Alpine.plugin(focus);
Alpine.plugin(mask);
Alpine.plugin(ui);
Alpine.start();
