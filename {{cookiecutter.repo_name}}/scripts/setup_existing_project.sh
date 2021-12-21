#!/bin/bash
echo "Setting up a previously created project"

## Set mydir to the directory containing the script
## The ${var%pattern} format will remove the shortest match of
## pattern from the end of the string. Here, it will remove the
## script's name,. leaving only the directory.
thisdir="${0%/*}"



export DJANGO_SETTINGS_MODULE=$ENV_NAME.config.settings.local

$thisdir/install_python_requirements.sh
$thisdir/setup_database.sh

echo "omae wa mou shindeiru"

$thisdir/setup_github.sh
$thisdir/setup_js.sh   # after git init to avoid husky/lint-stage not working

chmod +x manage.py

#todo - git flow init
echo "-------------------------------------------------------------"
echo "Maybe The Real setup_existing_project.sh Was the Friends We Made Along the Way"
echo "-------------------------------------------------------------"
