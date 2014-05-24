#!/bin/bash
#set up project name
ENV_NAME="{{ project_name }}"
ENV_OPSTS="--no-site-packages --distribute"

unset PYTHONDONTWRITEBYTECODE
echo "Making Virtual Environment"
os="`uname -a`"
if [[ "$os" == *Linux* ]]; then
    source /etc/bash_completion.d/virtualenvwrapper
else
    source `which virtualenvwrapper.sh`
fi



cd $WORKON_HOME
mkvirtualenv --distribute $ENV_OPTS $ENV_NAME
cd -
workon $ENV_NAME
export DJANGO_SETTINGS_MODULE=$ENV_NAME.settings.local
echo $VIRTUAL_ENV

#install requirements
if [ ! -d ${HOME}/.pip-packages ]
then
    mkdir -p ${HOME}/.pip-packages
fi


if [  -d $WORKON_HOME/{{ project_name }}/build/ ]
then
    rm -rf $WORKON_HOME/{{ project_name }}/build/
fi

pip install --download ${HOME}/.pip-packages --exists-action w -r requirements-dev.txt
pip install --no-index --exists-action w --find-links=file://${HOME}/.pip-packages/ -r requirements-dev.txt

#check if postgres installed
RESULT=`psql -l | grep light | wc -l | awk '{print $1}'`;
if test $RESULT -eq 0; then
    echo "Creating Database";
    psql -c "create role {{ project_name }} with createdb encrypted password '{{ project_name }}' login;"
    psql -c "create database {{ project_name }} with owner {{ project_name }};"
else
    echo "Database exists"
fi

#run initial migrations and syncdb
python manage.py syncdb --migrate

#link up with git!
if [ -d .git ]; then
  echo "Git exists";
else
    echo "Setting up Git"
    git init .
    git remote add origin "git@github.com:Lightmatter/{{ project_name }}.git"
fi

chmod +x manage.py
