#!/bin/bash
pip install poetry -q
echo "installing python deps"
export POETRY_VIRTUALENVS_IN_PROJECT="${POETRY_VIRTUALENVS_IN_PROJECT:=true}"
poetry install
