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
venv_path=$WORKON_HOME/$appname
unset DJANGO_SETTINGS_MODULE



# check to see if it's already created
if [ -d $appdir ]; then
    if [ "$keepenv" != true ]; then
        # check to see if the first arg in the command line is non-existent
        # if so, removes the virtual environment
        echo "Deleting Old venv"
        rm -rf $venv_path
    fi
    # then deletes the old app
    echo "Deleting Old app"
    rm -rf $appdir
fi

cd ..
base=$(pwd)
echo "Creating App"
python -m cookiecutter $original --default-config --no-input project_name=$appname use_wagtail=y
cd $appname


echo "Running tests"
source $venv_path/bin/activate
cd $base/$appname/

export DJANGO_SETTINGS_MODULE=$appname.$appname.settings.local
./scripts/validate.sh
python manage.py test --noinput --keepdb
RV=$?
rm -rf static/
cd $original
exit $RV
