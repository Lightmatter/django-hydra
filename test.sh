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

unset DJANGO_SETTINGS_MODULE



echo "Removing old app"
if [[ -d "../$appname" ]]
then
    set +e
    if [ "$keepenv" = true ]; then
        rm -rf /tmp/.venv
        mv ../$appname/.venv /tmp/.venv
        export POETRY_VIRTUALENVS_PATH=/tmp/.venv
        export POETRY_VIRTUALENVS_IN_PROJECT=false
    fi
    rm -rf ../$appname
    dropdb test_sampleapp
    dropdb sampleapp
    set -e
fi

echo "Creating App"
cookiecutter . --default-config --no-input project_name=$appname -o ../

if [ "$keepenv" = true ]; then
    mv /tmp/.venv ../$appname/
    unset POETRY_VIRTUALENVS_PATH
    unset POETRY_VIRTUALENVS_IN_PROJECT
fi

echo "Running tests"
cd ../$appname/

export DJANGO_SETTINGS_MODULE=$appname.$appname.settings.local


npm run build
./scripts/validate.sh
poetry run python manage.py test --noinput --keepdb  --parallel

RV=$?
rm -rf static/
cd $original
exit $RV
