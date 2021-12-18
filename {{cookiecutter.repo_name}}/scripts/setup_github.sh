#!/bin/bash

first_time=$1

#link up with git!
if [ -d .git ]; then
    echo "Git exists";
else
    echo "Setting up Git"
    git init . -b main
    git remote add origin "git@github.com:Lightmatter/{{ cookiecutter.repo_name }}.git"
    #todo - add all and make initial push
fi

if $first_time; then
    echo "Setting up the git repo for the first time"
    git add .
    git commit -am "initial commit" -q
    echo "Added everything and committed initially"
fi
