import "htmx.org";
// @ts-expect-error // todo: make a types file for x-widget
import xWidget from "x-widget";
import Alpine from "alpinejs";

declare global {
  interface Window {
    Alpine?: any;
  }
}

window.Alpine = Alpine;
Alpine.plugin(xWidget);
Alpine.start();
