#!/bin/bash

source `which virtualenvwrapper.sh`
unset PYTHONDONTWRITEBYTECODE

ENV_NAME="{{ cookiecutter.repo_name }}"
ENV_PATH="${PROJECT_HOME}/${ENV_NAME}"

workon $ENV_NAME
cd $ENV_PATH

if [ ! -d ${HOME}/.pip-packages ]
then
    mkdir -p ${HOME}/.pip-packages
fi



if [  -d $WORKON_HOME/{{ cookiecutter.repo_name }}/build/ ]

then
    rm -rf $WORKON_HOME/{{ cookiecutter.repo_name }}/build/
fi


pip install pip-accel
which pip-accel
if [ $? -ne 0 ]; then
    pip install --download ${HOME}/.pip-packages --exists-action w -r requirements-dev.txt
    pip install --no-index --exists-action w --find-links=file://${HOME}/.pip-packages/ -r requirements-dev.txt
else
    pip install -r requirements-dev.txt
fi

RESULT=`psql -l | grep "{{ cookiecutter.repo_name }}" | wc -l | awk '{print $1}'`;
if test $RESULT -eq 0; then
    echo "Creating Database";
    psql -c "create role {{ cookiecutter.repo_name }} with createdb encrypted password '{{ cookiecutter.repo_name }}' login;"
    psql -c "alter user {{ cookiecutter.repo_name }} superuser;"
    psql -c "create database {{ cookiecutter.repo_name }} with owner {{ cookiecutter.repo_name }};"
else
    echo "Database exists"
fi

export DJANGO_SETTINGS_MODULE=$ENV_NAME.$ENV_NAME.settings.local

SECRET_KEY=`python -c 'import random; print("".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)]))'`
#todo - git flow init
cat >> .env <<EOF
SECRET_KEY="${SECRET_KEY}"
EOF

python manage.py migrate


echo "Setting up Git"
git init .
git remote add origin "git@github.com:{{cookiecutter.org_name}}/{{ cookiecutter.repo_name }}.git"
git flow init -d
git add .
git commit -m "initial commit"
git push

chmod +x manage.py

mv .env.example .env
