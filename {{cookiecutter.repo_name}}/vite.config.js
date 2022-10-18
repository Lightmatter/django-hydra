const { resolve } = require('path');
const fg = require('fast-glob');
import { defineConfig } from 'vite';


export default defineConfig({
  base: "/static/",
  root: resolve('./frontend/'),
  resolve:{
    alias:{
      '@' : resolve('./frontend')
    },
  },
  build: {
    manifest: true, // adds a manifest.json
    rollupOptions: {
      input: {
        main: resolve(__dirname, './frontend/js/main.ts'),
        base: resolve(__dirname, './frontend/css/base.js'),
        raw_tailwind: resolve(__dirname, './frontend/css/tailwind.js'),
      }
    },
    outDir:  '../{{cookiecutter.repo_name}}/static', // puts the manifest.json in PROJECT_ROOT/static_source/
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
