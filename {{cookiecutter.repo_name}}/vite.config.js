const { resolve } = require('path');
const fg = require('fast-glob');
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
  base: "/static/",
  root: resolve('./frontend/'),
  build: {
    manifest: true, // adds a manifest.json
    rollupOptions: {
      input: {
        fontawesome: resolve(__dirname, './frontend/fontawesome/fontawesome.js'),
        htmx: resolve(__dirname, './frontend/js/htmx.js'),
        main: resolve(__dirname, './frontend/js/main.ts'),
        system: resolve(__dirname, './frontend/js/system.ts'),
      }
    },
    outDir:  '../{{cookiecutter.repo_name}}/static', // puts the manifest.json in PROJECT_ROOT/theme/static/
  },
  plugins: [
    vue(),
    {
      name: 'watch-external', // https://stackoverflow.com/questions/63373804/rollup-watch-include-directory/63548394#63548394
      async buildStart(){
        const files = await fg(['{{cookiecutter.repo_name}}/templates/**/*']);
        for(let file of files){
          this.addWatchFile(file);
        }
      }
    },
    {
      name: 'reloadHtml',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.html')) {
          server.ws.send({
            type: 'full-reload',
            path: '*',
          });
        }
      },
    }
  ],
});
