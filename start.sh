#!/bin/echo
ENV_NAME="{{ project_name }}"
ENV_OPSTS="--no-site-packages --distribute"
unset PYTHONDONTWRITEBYTECODE
echo "Making Virtual Environment"
source `which virtualenvwrapper.sh`
cd $WORKON_HOME
mkvirtualenv --distribute $ENV_OPTS $ENV_NAME
cd -
workon $ENV_NAME
echo $VIRTUAL_ENV
pip install -r requirements-dev.txt
psql -c "create role {{ project_name }} with encrypted password '{{ project_name }}' login;"
psql -c "create database {{ project_name }} with owner {{ project_name }};"
python $ENV_NAME/manage.py syncdb --migrate


