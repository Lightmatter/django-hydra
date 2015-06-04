#!/bin/bash
if [ -z $1 ]; then
    echo "Removing the old env"
fi
if [ -n $1 ]; then
    echo "Keeping the old env"
fi

cwd=$(pwd)
unset DJANGO_SETTINGS_MODULE
source `which virtualenvwrapper.sh`
if [ -d ../testapp ]; then
    if [ -z $1 ]; then
        echo "Deleting Old venv"
        rmvirtualenv testapp
    fi
    echo "Deleting Old app"
    rm -rf ../testapp
fi
echo "installing venvwrapper"
cd ../
pip install virtualenvwrapper
echo "creating app"
django-admin.py startproject --template=./generic-django-conf/ --extension=py,rb,sh,yml,project_name --name=Procfile testapp
cd testapp
if [ -z $1 ]; then
    echo "Running Start.sh"
    ./start.sh
    echo "Running tests"
fi
workon testapp
export DJANGO_SETTINGS_MODULE=testapp.settings.local
python manage.py collectstatic --noinput
rm -rf static/
python manage.py test --noinput --keepdb
cd $cwd
