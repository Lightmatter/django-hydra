#!/bin/bash
original=$(pwd)

if [ -z $1 ]; then
    echo "Removing the old env"
else
    echo "Keeping the old env"
fi

tmpfolder=""
appname=sampleapp
appdir=../$appname
unset DJANGO_SETTINGS_MODULE
echo "Installing virtualenvwrapper"
#TODO - test to make sure you're not running this from inside a venv
pip install --user virtualenvwrapper
echo "Installed virtualenvwrapper"
source `which virtualenvwrapper.sh`

if [ -d $appdir ]; then
    # check to see if it's already created
    if [ -z $1 ]; then
        # check to see if the first arg in the command line is non-existent
        # if so, removes the virtual environment
        echo "Deleting Old venv"
        rmvirtualenv $appname
    fi
    # then deletes the old app
    # save the old npm folder
    if [ -d $appdir/node_modules ]; then
        echo "caching npm run"
        tmpfolder=`mktemp -d`
        mv $appdir/node_modules $tmpfolder/
    fi
    # then deletes the old app
    echo "Deleting Old app"
    rm -rf $appdir
fi

cd ..
base=$(pwd)
echo "Creating App"
cookiecutter generic-django-conf --default-config --no-input
cd $appname
#TODO: figure out how to get this into the cookiecuttered project after clone before post
# if [ -d $tmpfolder/node_modules ]; then
#     mv $tmpfolder/node_modules .
# fi

if [ -z $1 ]; then
    echo "Running Start.sh"
    ./scripts/start.sh
fi
echo "Running tests"
workon $appname
cd $base/$appname/
export DJANGO_SETTINGS_MODULE=$appname.$appname.settings.local
npm run build
python manage.py collectstatic --noinput -v 0
python manage.py test --noinput --keepdb
prospector $appname -X -I "$appname/settings/*"
RV=$?
rm -rf static/
cd $original
exit $RV
