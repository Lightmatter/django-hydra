#!/bin/bash

# create virtual environment

echo "Setting up repository..."
ENV_NAME="{{ cookiecutter.repo_name }}"
ENV_PATH="${PROJECT_HOME}/${ENV_NAME}"

source `which virtualenvwrapper.sh`

unset PYTHONDONTWRITEBYTECODE
echo "${ENV_NAME} ${VIRT} ${WORKON_HOME}"
cd $WORKON_HOME

echo "Creating virtual environment..."
cd $WORKON_HOME
mkvirtualenv $ENV_NAME -ppython3
cd -
echo "virtualenv created!"
workon $ENV_NAME
pip install cookiecutter # incase system version of python is 2
