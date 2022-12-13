import glob from "glob";
import { resolve } from "path";

const path = resolve(__dirname, "./{{cookiecutter.repo_name}}/templates/components/**/*{.js, .ts}");
glob(path, options, (er, files) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    import(file);
  }
});
