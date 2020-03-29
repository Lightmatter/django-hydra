#!/bin/bash
set -e

bandit -r {{cookiecutter.repo_name}}/ -l -x tests.py
isort --check-only {{cookiecutter.repo_name}}/**/*.py
black --check --diff --exclude=/migrations/ {{cookiecutter.repo_name}}/
prospector {{cookiecutter.repo_name}} -X -I "{{cookiecutter.repo_name}}/settings/*"
