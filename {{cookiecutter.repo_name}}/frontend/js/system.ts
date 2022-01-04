import {createApp, reactive} from 'petite-vue';
import 'htmx.org';
const store = reactive({})

const app = createApp({
  store,
  $delimiters: ['${', '}']
});

//catch template jitter
app.mount(document.body);

document.body.addEventListener('htmx:afterSwap', (evt: any) => {
  app.mount(evt.target);
});

document.body.addEventListener('htmx:load', (evt: any) => {
  app.mount(evt.detail.elt);
});
