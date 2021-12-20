/* eslint-disable import/first */

// @ts-expect-error
if (import.meta.env.MODE !== 'development') {
    // @ts-expect-error
    import('vite/modulepreload-polyfill')
}


// Import our CSS
import '/css/app-base.css';
import '/css/app-components.css';
import '/css/app-utilities.css';
