#!/bin/bash
if [ -d testapp ]; then
    echo "Deleting Old app"
    rm -rf testapp
fi
echo "Creating app"
django-admin.py startproject --template=. --extension=py,rb,sh,yml,project_name --name=Procfile testapp
cd testapp
echo "Running Start.sh"
./start.sh
echo "Running tests"
source `which virtualenvwrapper.sh`
workon testapp
export DJANGO_SETTINGS_MODULE=testapp.settings.local
echo `pwd`
python manage.py test
