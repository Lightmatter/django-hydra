#!/bin/bash

echo "Running Start.sh"
isort {{cookiecutter.repo_name}}/**/*.py
./scripts/start.sh
