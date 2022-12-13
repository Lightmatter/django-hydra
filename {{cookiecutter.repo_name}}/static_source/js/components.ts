import glob from "glob";
import { resolve } from "path";

glob(resolve(__dirname, "./{{cookiecutter.repo_name}}/templates/components/**/*{.js, .ts}"), (er, files) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    import(file);
  }
});
