#!/bin/bash
echo "Setting up for a GRRRRREAT DJANGO PROJECT"

## Set mydir to the directory containing the script
## The ${var%pattern} format will remove the shortest match of
## pattern from the end of the string. Here, it will remove the
## script's name,. leaving only the directory.
thisdir="${0%/*}"

cp $thisdir/../.env.example $thisdir/../.env;

echo "omae wa mou shindeiru"
$thisdir/setup_github.sh
$thisdir/install_js_requirements.sh   # after git init to avoid husky/lint-stage not working
chmod +x manage.py

docker-compose build

#todo - git flow init
echo "-------------------------------------------------------------"
echo "Maybe The Real start.sh Was the Friends We Made Along the Way"
echo "-------------------------------------------------------------"
