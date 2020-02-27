#!/bin/bash

export ENV_NAME="{{ cookiecutter.repo_name }}"

unset PYTHONDONTWRITEBYTECODE
echo "Making Virtual Environment"
os="`uname -a`"
source /etc/bash_completion.d/virtualenvwrapper
source `which virtualenvwrapper.sh`


cd $WORKON_HOME
mkvirtualenv --distribute $ENV_OPTS $ENV_NAME  -ppython3
cd -
workon $ENV_NAME
export DJANGO_SETTINGS_MODULE=$ENV_NAME.$ENV_NAME.settings.local
echo $VIRTUAL_ENV

#install requirements
if [ ! -d ${HOME}/.pip-packages ]
then
    mkdir -p ${HOME}/.pip-packages
fi


if [  -d $WORKON_HOME/{{ cookiecutter.repo_name }}/build/ ]
then
    rm -rf $WORKON_HOME/{{ cookiecutter.repo_name }}/build/
fi

if [ $? -ne 0 ]; then
    pip install --download ${HOME}/.pip-packages --exists-action w -r requirements-dev.txt
    pip install --no-index --exists-action w --find-links=file://${HOME}/.pip-packages/ -r requirements-dev.txt
else
    pip install -r requirements-dev.txt
fi


#check if postgres installed
RESULT=`psql -l | grep "{{ cookiecutter.repo_name }}" | wc -l | awk '{print $1}'`;
if test $RESULT -eq 0; then
    echo "Creating Database";
    psql -c "create role {{ cookiecutter.repo_name }} with createdb encrypted password '{{ cookiecutter.repo_name }}' login;"
    psql -c "alter user {{ cookiecutter.repo_name }} superuser;"
    psql -c "create database {{ cookiecutter.repo_name }} with owner {{ cookiecutter.repo_name }};"
else
    echo "Database exists"
fi

#run initial setup of database tables
python manage.py migrate

#link up with git!
if [ -d .git ]; then
  echo "Git exists";
else
    echo "Setting up Git"
    git init .
    git remote add origin "git@github.com:Lightmatter/{{ cookiecutter.repo_name }}.git"
    #todo - add all and make initial push
fi

#todo - git flow init

chmod +x manage.py

# yarn install after git init to avoid husky/lint-stage not working
yarn install
