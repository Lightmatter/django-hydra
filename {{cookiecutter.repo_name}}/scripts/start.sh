#!/bin/bash
echo "Setting up for a GRRRRREAT DJANGO PROJECT"

## Set mydir to the directory containing the script
## The ${var%pattern} format will remove the shortest match of
## pattern from the end of the string. Here, it will remove the
## script's name,. leaving only the directory.
thisdir="${0%/*}"


echo "Making Virtual Environment for {{cookiecutter.repo_name}}"
export ENV_NAME="{{cookiecutter.repo_name}}"
os="`uname -a`"
WORKON_HOME=${WORKON_HOME:-~/.virtualenvs}  # set default value for workon home
python -m venv $WORKON_HOME/$ENV_NAME
source $WORKON_HOME/$ENV_NAME/bin/activate


export DJANGO_SETTINGS_MODULE=$ENV_NAME.$ENV_NAME.settings.local

source $thisdir/install_python_requirements.sh
source $thisdir/setup_database.sh
echo "omae wa mou shindeiru"
source $thisdir/setup_github.sh
source $thisdir/install_js_requirements.sh   # after git init to avoid husky/lint-stage not working

chmod +x manage.py

#todo - git flow init
echo "-------------------------------------------------------------"
echo "Maybe The Real Treasure Was the Friends We Made Along the Way"
echo "-------------------------------------------------------------"
