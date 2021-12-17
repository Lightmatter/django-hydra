#!/bin/bash
set -e

poetry run bandit -r {{cookiecutter.repo_name}}/ -l -x tests.py
poetry run isort --check-only {{cookiecutter.repo_name}}/**/*.py
poetry run black --check --diff --exclude=/migrations/ {{cookiecutter.repo_name}}/
poetry run prospector -I "{{cookiecutter.repo_name}}/settings/*"
