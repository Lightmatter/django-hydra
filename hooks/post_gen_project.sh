#!/bin/bash
set -e +o pipefail

source `which virtualenvwrapper.sh`
unset PYTHONDONTWRITEBYTECODE

ENV_NAME="{{ cookiecutter.repo_name }}"
ENV_PATH="${PROJECT_HOME:?}/$ENV_NAME"

workon $ENV_NAME
cd $ENV_PATH

if [ ! -d "${HOME:?}/.pip-packages" ]; then
    mkdir -p "$HOME/.pip-packages"
fi

if [ -d "${WORKON_HOME:?}/{{ cookiecutter.repo_name }}/build/" ]; then
    rm -rf "$WORKON_HOME/{{ cookiecutter.repo_name }}/build/"
fi

pip download -r requirements-dev.txt -d "$HOME/.pip-packages" --exists-action w
pip install --no-index --exists-action w --find-links="file://$HOME/.pip-packages/" -r requirements-dev.txt

# Create the DB if necessary
RESULT=`psql -l | grep "{{ cookiecutter.repo_name }}" | wc -l | awk '{print $1}'`;
if test "$RESULT" -eq 0; then
    echo "Creating Database";
    psql -c "create role {{ cookiecutter.repo_name }} with createdb encrypted password '{{ cookiecutter.repo_name }}' login;"
    psql -c "alter user {{ cookiecutter.repo_name }} superuser;"
    psql -c "create database {{ cookiecutter.repo_name }} with owner {{ cookiecutter.repo_name }};"
else
    echo "Database exists"
fi

export DJANGO_SETTINGS_MODULE="$ENV_NAME.$ENV_NAME.settings.local"

python manage.py migrate

chmod +x manage.py
cp .env.example .env

echo "Setting up Git"
git init .
git remote add origin "git@github.com:{{cookiecutter.org_name}}/{{ cookiecutter.repo_name }}.git"
git flow init -d || echo "Don't forget to install git flow"
git add .
git commit -m "initial commit"
#this might not work, it's ok if it fails
git push --set-upstream origin develop || echo "don't forget to setup github!"
