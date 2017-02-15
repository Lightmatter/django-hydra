#!/bin/bash
original=$(pwd)

if [ -z $1 ]; then
    echo "Removing the old env"
else
    echo "Keeping the old env"
fi

app=../testapp
unset DJANGO_SETTINGS_MODULE
source `which virtualenvwrapper.sh`

if [ -d $app ]; then
    # check to see if it's already created
    if [ -z $1 ]; then
        # check to see if the first arg in the command line is non-existent
        # if so, removes the virtual environment
        echo "Deleting Old venv"
        rmvirtualenv testapp
    fi
    # then deletes the old app
    echo "Deleting Old app"
    rm -rf $app
fi

echo "Installing virtualenvwrapper"
pip install virtualenvwrapper

cd ..
base=$(pwd)
echo "Creating App"
cookiecutter generic-django-conf --default-config --no-input
cd testapp
if [ -z $1 ]; then
    echo "Running Start.sh"
    ./scripts/start.sh
fi
echo "Running tests"
workon testapp
cd $base/testapp/
export DJANGO_SETTINGS_MODULE=testapp.testapp.settings.local
python manage.py collectstatic --noinput
python manage.py test --noinput --keepdb
prospector testapp
RV=$?
rm -rf static/
cd $original
exit $RV
