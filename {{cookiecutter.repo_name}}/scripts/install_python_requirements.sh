#!/bin/bash

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
