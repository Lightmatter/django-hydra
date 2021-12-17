if (import.meta.env.MODE !== 'development') {
  // @ts-ignore: need to figure out what to install to make ts happy
  import('vite/modulepreload-polyfill');
}
// Import our CSS
import '/css/app-base.css';
import '/css/app-components.css';
import '/css/app-utilities.css';
