#!/bin/bash
set -e
shopt -s globstar
yarn eslint src/**/*.ts
yarn eslint src/**/*.tsx
