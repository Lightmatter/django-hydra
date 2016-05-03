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
    if [ -z $1 ]; then
        echo "Deleting Old venv"
        rmvirtualenv testapp
    fi
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
rm -rf static/
python manage.py test --noinput --keepdb
RV=$?
cd $original
exit $RV
