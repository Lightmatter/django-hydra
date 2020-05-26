var path = require("path");

const PROJECT_NAME = "{{cookiecutter.repo_name}}";

const PATHS = {
  app: path.join(__dirname, '..', PROJECT_NAME),
};

PATHS.static_source = path.join(PATHS.app, "static_source");
PATHS.templates = path.join(PATHS.app, "templates");
PATHS.js = path.join(PATHS.static_source, "js");
PATHS.vendor = path.join(PATHS.static_source, "vendor");
PATHS.build = path.join(PATHS.static_source, "bundles");
PATHS.sass = path.join(PATHS.static_source, "sass");
PATHS.css = path.join(PATHS.static_source, "css");
PATHS.fonts = path.join(PATHS.static_source, "fonts");

module.exports = {
  PATHS: PATHS,
  PROJECT_NAME: PROJECT_NAME
};
