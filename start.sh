#!/bin/echo
#set up project name
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

#install requirements
pip install -r requirements-dev.txt

#check if postgres installed
RESULT=`psql -l | grep light | wc -l | awk '{print $1}'`;
if test $RESULT -eq 0; then
    echo "Creating Database";
    psql -c "create role {{ project_name }} with encrypted password '{{ project_name }}' login;"
    psql -c "create database {{ project_name }} with owner {{ project_name }};"
else
    echo "Database exists"
fi

python $ENV_NAME/manage.py syncdb --migrate
if [ -d .git ]; then
  echo "Git exists";
else
    "Setting up Git"
    git init .
    git remote add origin "git@github.com:Lightmatter/{{ project_name }}.git"
fi

