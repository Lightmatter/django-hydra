import "htmx.org";
import Alpine from "alpinejs";

declare global {
  interface Window {
    Alpine?: any;
  }
}

// @ts-expect-error // needs to declare that htmx lives on window, auto added by import
const { htmx } = window; // eslint-disable-line  @typescript-eslint/no-unused-vars
window.Alpine = Alpine;
Alpine.start();

// if (import.meta.hot) {
//   import.meta.hot.on("special-update", (data) => {});
// }
