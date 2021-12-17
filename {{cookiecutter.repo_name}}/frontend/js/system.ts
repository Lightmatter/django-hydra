// @ts-ignore
import {createApp, reactive} from 'petite-vue';

const store = reactive({
  count: 0,
  global_inc() {
    this.count++
  }
})


function GlobalCounter(props: {initialCount: number}) {
  return {
    count: props.initialCount,
    inc() {
      store.global_inc();
    },
    mounted() {
      console.log(`I'm mounted!`);
    }
  };
}


function Counter(props: {initialCount: number} ) {
  return {
    count: props.initialCount,
    inc() {
      this.count++
    },
    mounted() {
      console.log(`I'm mounted!`);
    }
  };
}


// manipulate it here
store.global_inc();


const app = createApp({
  store,
  GlobalCounter,
  Counter,
  $delimiters: ['${', '}']
});
//catch template jitter
app.mount(document.body);

// @ts-ignore: htmx needs on declared
document.body.addEventListener('htmx:afterSwap', (evt: any) => {
  app.mount(evt.target);
});

// @ts-ignore: htmx needs on declared
document.body.addEventListener('htmx:load', (evt: any) => {
  app.mount(evt.detail.elt);
});
