#!/bin/bash

#link up with git!
if [ -d .git ]; then
    echo "Git exists";
else
    echo "Setting up Git"
    git init . -b main
    git remote add origin "git@github.com:{{ cookiecutter.org_name }}/{{ cookiecutter.repo_name }}.git"
    #todo - add all and make initial push
fi
