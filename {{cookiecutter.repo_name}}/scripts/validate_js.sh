#!/bin/bash
set -e
shopt -s globstar
yarn eslint src/**/*.js
yarn eslint src/**/*.jsx
