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

// Turn off the history cache - have found this is generally error prone
htmx.config.historyCacheSize = 0;

// Optional behavior - will remove scroll to top animation for boosted pages
htmx.config.scrollBehavior = "auto";

htmx.defineExtension("get-csrf", {
  onEvent(name: string, evt: any) {
    if (name === "htmx:configRequest") {
      evt.detail.headers["X-CSRFToken"] = Cookies.get(
        "{{cookiecutter.repo_name}}_csrftoken"
      );
    }
  },
});

htmx.defineExtension("get-timezone", {
  onEvent: function(name: string, evt: any) {
    if (name === "htmx:configRequest") {
      evt.detail.headers["X-Timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
  }
});

// This function will listen for HTMX errors and display the appropriate page
// as needed. Without debug mode enabled, HTMX will normally refuse to
// serve any HTML attached to an HTTP error code. This will allow us to present
// users with custom error pages.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
htmx.on("htmx:beforeOnLoad", (event:any) => {
  const { xhr } = event.detail;
  if (xhr.status === 500 || xhr.status === 404) {
    event.stopPropagation();
    document.children[0].innerHTML = xhr.response;
  }
});

if (import.meta.hot) {
  import.meta.hot.on("template-hmr", () => {
    const dest = document.location.href;
    htmx.ajax("GET", dest, { target: "body", swap: "morph" });
  });
}

window.Alpine = Alpine;
Alpine.plugin(focus);
Alpine.plugin(mask);
Alpine.plugin(ui);
Alpine.start();
