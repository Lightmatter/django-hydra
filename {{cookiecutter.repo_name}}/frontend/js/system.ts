import "htmx.org";
import xWidget from "x-widget";
import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.plugin(xWidget);
Alpine.start();

// Alpine.directive('slot',
//   (el, { expression }, { Alpine }) => {
//     Alpine.$data(el)[expression] = el.outerHTML;
//   });

// document.addEventListener("DOMContentLoaded", () => {
//   // catch template jitter
//   app.mount(document.body);

//   /* eslint-disable @typescript-eslint/no-explicit-any */
//   document.body.addEventListener("htmx:afterSwap", (evt: any) => {
//     app.mount(evt.target);
//   });

//   /* eslint-disable @typescript-eslint/no-explicit-any */
//   document.body.addEventListener("htmx:load", (evt: any) => {
//     app.mount(evt.detail.elt);
//   });
// });

// class Modal extends HTMLElement {
//   constructor() {
//     super();
//     const template = document.getElementById('modal');
//     const templateContent = template.content;
//     const innerHTML = templateContent.cloneNode(true);
//     this.innerHTML = ''
//     this.append(innerHTML);
//   }
// }
// customElements.define("alpine-modal",Modal);
