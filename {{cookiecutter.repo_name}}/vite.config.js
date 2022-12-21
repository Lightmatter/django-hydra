const { resolve } = require('path');
const fg = require('fast-glob');
import { defineConfig } from 'vite';


export default defineConfig({
  // Where the project's files are
  root: resolve('./{{cookiecutter.repo_name}}/static_source/'),
  // The public path where assets are served, both in development and in production.
  base: "/static/",
  resolve:{
    alias:{
      // Use '@' in urls as a shortcut for './static_source'. (Currently used in CSS files.)
      '@' : resolve('./{{cookiecutter.repo_name}}/static_source')
    },
  },
  build: {
    manifest: true, // adds a manifest.json
    rollupOptions: {
      input: {
        /* The bundle's entry point(s).  If you provide an array of entry points or an object mapping names to 
        entry points, they will be bundled to separate output chunks. */
        components: resolve(__dirname, './{{cookiecutter.repo_name}}/static_source/js/components.ts'),
        main: resolve(__dirname, './{{cookiecutter.repo_name}}/static_source/js/main.ts'),
        styles: resolve(__dirname, './{{cookiecutter.repo_name}}/static_source/css/styles.js'),
        raw_tailwind: resolve(__dirname, './{{cookiecutter.repo_name}}/static_source/css/tailwind.js'),
      }
    },
    outDir:  './', // puts the manifest.json in PROJECT_ROOT/static_source/
  },
  plugins: [
    {
      name: 'watch-external', // https://stackoverflow.com/questions/63373804/rollup-watch-include-directory/63548394#63548394
      async buildStart(){
        const htmls = await fg(['{{cookiecutter.repo_name}}/templates/**/*.html']);
        for(let file of htmls){
          this.addWatchFile(file);
        }

        const jinjas = await fg(['{{cookiecutter.repo_name}}/templates/**/*.jinja']);
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
