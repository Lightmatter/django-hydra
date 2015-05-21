#!/bin/bash
cwd=$(pwd)
unset DJANGO_SETTINGS_MODULE
source `which virtualenvwrapper.sh`
if [ -d ../testapp ]; then
    echo "Deleting Old venv"
    rmvirtualenv testapp
    echo "Deleting Old app"
    rm -rf ../testapp
fi
echo "Creating app"
cd ../
pip install virtualenvwrapper
django-admin.py startproject --template=./generic-django-conf/ --extension=py,rb,sh,yml,project_name --name=Procfile testapp
cd testapp
echo "Running Start.sh"
./start.sh
echo "Running tests"
workon testapp
export DJANGO_SETTINGS_MODULE=testapp.settings.local
python manage.py collectstatic --noinput
python manage.py test --noinput
cd $cwd
