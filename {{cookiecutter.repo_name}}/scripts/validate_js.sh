#!/bin/bash
set -e
shopt -s globstar
npx eslint src/**/*.js
npx eslint src/**/*.jsx
