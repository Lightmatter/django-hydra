#!/bin/bash

#link up with git!
if [ -d .git ]; then
    echo "Git exists";
else
    echo "Setting up Git"
    git init .
    git remote add origin "git@github.com:Lightmatter/{{ cookiecutter.repo_name }}.git"
    #todo - add all and make initial push
fi
git add .
git commit -am "initial commit"
