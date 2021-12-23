#!/bin/bash
set -e

poetry run isort {{cookiecutter.repo_name}}/**/*.py
poetry run black --exclude=/migrations/ {{cookiecutter.repo_name}}/
