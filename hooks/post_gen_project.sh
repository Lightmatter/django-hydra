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

python manage.py migrate

{% if cookiecutter.install_mailhog == "y" %}
# download mailhog binary
SYSTEM=uname

if [[ $SYSTEM == 'Linux' ]]; then
  curl -o node/mailhog/mailhog -J -L  https://github.com/mailhog/MailHog/releases/download/v0.2.0/MailHog_linux_amd64
else
  curl -o node/mailhog/mailhog -J -L  https://github.com/mailhog/MailHog/releases/download/v0.2.0/MailHog_darwin_amd64
fi
# make it executable
chmod a+x node/mailhog/mailhog

echo "Installing NPM dependencies required to load MailHog server"

npm install
# Should I just move it to root of the project folder? I don't know if node needs to it to be in the same directory...
echo "||===================================================================================||"
echo "|| To start mailhog, run ./node/mailhog/mailhog or make an alias to it. ||"
echo "||===================================================================================||"
{% endif %}

chmod +x manage.py
mv .env.example .env

echo "Setting up Git"
git init .
git remote add origin "git@github.com:{{cookiecutter.org_name}}/{{ cookiecutter.repo_name }}.git"
git flow init -d
git add .
git commit -m "initial commit"
#this might not work, it's ok if it fails
git push --set-upstream origin develop || echo "don't forget to setup github!"
