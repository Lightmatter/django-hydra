const { resolve } = require('path');
const fg = require('fast-glob');
import { defineConfig } from 'vite';


export default defineConfig({
  // Where the project's files are
  root: resolve('./static_source/'),
  // The public path where assets are served, both in development and in production.
  base: "/static/",
  resolve:{
    alias:{
      // Use '@' in urls as a shortcut for './static_source'. (Currently used in CSS files.)
      '@' : resolve('./static_source')
    },
  },
  build: {
    manifest: true, // adds a manifest.json
    rollupOptions: {
      input: {
        /* The bundle's entry point(s).  If you provide an array of entry points or an object mapping names to 
        entry points, they will be bundled to separate output chunks. */
        main: resolve(__dirname, './frontend_comp/templates/components/main.ts'),
        base: resolve(__dirname, './static_source/css/base.js'),
        raw_tailwind: resolve(__dirname, './static_source/css/tailwind.js'),
        // Components go here
        flyout: resolve(__dirname, './frontend_comp/templates/components/flyout/flyout.ts')
      }
    },
    outDir:  '../frontend_comp/static', // puts the manifest.json in PROJECT_ROOT/static/
  },
  plugins: [
    {
      name: 'watch-external', // https://stackoverflow.com/questions/63373804/rollup-watch-include-directory/63548394#63548394
      async buildStart(){
        const htmls = await fg(['frontend_comp/templates/**/*.html']);
        for(let file of htmls){
          this.addWatchFile(file);
        }

        const jinjas = await fg(['frontend_comp/templates/**/*.jinja']);
        for(let file of jinjas){
          this.addWatchFile(file);
        }
      }
    },
    {
      name: 'reloadHtml',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.html') || file.endsWith('.jinja') ){
          server.ws.send({
            type: 'custom',
            event: 'template-hmr',
            path: '*',
          });
        }
      },
    }
  ],
});
