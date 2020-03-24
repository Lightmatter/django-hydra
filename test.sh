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
echo "Installing virtualenvwrapper"
# pip install --user virtualenvwrapper
# source `which virtualenvwrapper.sh`
# #
#test to make sure you're not running this from inside a venv
if [[ "$VIRTUAL_ENV" != "" ]]
then
    pip install virtualenvwrapper
else
    echo "Installed virtualenvwrapper"
    pip install --user virtualenvwrapper
    source `which virtualenvwrapper.sh`
fi
if [[ -f "/etc/bash_completion.d/virtualenvwrapper" ]]; then
    echo "sourced wrapper"
    source "/etc/bash_completion.d/virtualenvwrapper"
fi

if [ -d $appdir ]; then
    # check to see if it's already created
    if [ "$keepenv" != true ]; then
        # check to see if the first arg in the command line is non-existent
        # if so, removes the virtual environment
        echo "Deleting Old venv"
        rmvirtualenv $appname
    fi
    # then deletes the old app
    echo "Deleting Old app"
    rm -rf $appdir
fi

cd ..
base=$(pwd)
echo "Creating App"
python -m cookiecutter $original --default-config --no-input
cd $appname

if [ $keepenv != true ]; then
    echo "Running Start.sh"
    ./scripts/start.sh
fi
echo "Running tests"
source $WORKON_HOME/$appname/bin/activate
cd $base/$appname/


export DJANGO_SETTINGS_MODULE=$appname.$appname.settings.local
python manage.py test --noinput --keepdb
prospector $appname -X -I "$appname/settings/*"
RV=$?
rm -rf static/
cd $original
exit $RV
