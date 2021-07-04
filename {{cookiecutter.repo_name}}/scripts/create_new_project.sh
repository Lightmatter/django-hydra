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
python3 -m venv $WORKON_HOME/$ENV_NAME
source $WORKON_HOME/$ENV_NAME/bin/activate


export DJANGO_SETTINGS_MODULE=$ENV_NAME.$ENV_NAME.settings.local
cp $thisdir/../.env.example $thisdir/../.env;

$thisdir/install_python_requirements.sh
$thisdir/setup_database.sh
echo "omae wa mou shindeiru"
$thisdir/setup_github.sh
$thisdir/setup_js.sh   # after git init to avoid husky/lint-stage not working
chmod +x manage.py

#todo - git flow init
echo "-------------------------------------------------------------"
echo "Maybe The Real start.sh Was the Friends We Made Along the Way"
echo "-------------------------------------------------------------"
