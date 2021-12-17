#!/bin/bash
set -e
original=$(pwd)
keepenv=false
circle=false

while getopts "k" opt; do
    case ${opt} in
        k)
            echo "Keeping the old env"
            keepenv=true
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            ;;
    esac
done

tmpfolder=""
appname=sampleapp
appdir=../$appname
WORKON_HOME=${WORKON_HOME:-~/.virtualenvs}  # set default value for workon home
export POETRY_VIRTUALENVS_PATH=$WORKON_HOME

venv_path=$WORKON_HOME/$appname
unset DJANGO_SETTINGS_MODULE



echo "Removing old app"
if [[ -d "../$appname" ]]
then
    rm -rf ../$appname
    set +e
    dropdb test_sampleapp
    dropdb sampleapp
    set -e
fi

echo "Creating App"
cookiecutter . --default-config --no-input project_name=$appname -o ../

echo "Running tests"
cd ../$appname/

export DJANGO_SETTINGS_MODULE=$appname.$appname.settings.local
source $WORKON_HOME/$appname/bin/activate

./scripts/validate.sh
./manage.py test --noinput --keepdb
RV=$?
rm -rf static/
cd $original
exit $RV
