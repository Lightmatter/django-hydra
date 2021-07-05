***************************
LightMatter Django Template
***************************

# About

A generic template for Django 3 that can be easily extended for various needs including, but not limited to, using Wagtail as a CMS, incorporating React for a front end, etc.


# Prerequisites

The following items are required in order for this template to work. 

## Dependencies 

* [node](https://nodejs.org/en/download/): 
  * [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
  * [yarn](https://classic.yarnpkg.com/en/docs/install/)
  * [webpack](https://webpack.js.org/guides/installation/)
* [python3](https://www.python.org/downloads/), although [pyenv](https://github.com/pyenv/pyenv) is recommended to manage versions: 
  * [cookiecutter](https://cookiecutter.readthedocs.io/en/1.7.2/installation.html) 
  * [virtualenvwrapper](https://pypi.org/project/virtualenvwrapper/)
* [git](https://git-scm.com/downloads)
* bash ([WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10) or [Cygwin](https://cygwin.com/install.html)
  recommended for windows users)
* [postgres](https://www.postgresql.org/download/)
* [terraform](https://www.terraform.io/** Used with Heroku for our CI


## Environment configuration 

There is also a certain amount of environmental configuration that must be done in order for the above dependencies
and the below template to work. 

**Note** 
There is a section below the OS Specific configuration that you will *also* need to do in order to ensure that 
your virtualenvwrapper is working properly, however you should first perform the steps specific to your operating system 
listed below. 
 
### macOS

Below is a sample configuration for the latest version of macOS (11.4 Big Sur), but it should work for any *nix based distribution. 
If you have a setup guide for windows or a given linxu distro, please list them below. If you use a specific, non-standard shell, 
please call that out. 

#### Dependencies

* It is highly recommended to install the above dependencies, as well as anything below via homebrew. 
If you do not have homebrew, get the install command [here](https://brew.sh/)
* You likely need to install libpq-dev, `brew install libpq-dev`, although if you install with homebrew it will have 
installed this already most likely. If your postgres instance is not working, run this command.
* For file watching and debugging, install [watchman](https://facebook.github.io/watchman/). `brew install watchman` 
* You will likely need GSL as well, `brew install gsl`.

#### Run-commands / profile 

You should have the following in your `.bashrc` or `.zshrc` or equivalent. 

1. Setup the Path Variable (This is for Pyenv)

```bash
# PATH definition using Pyenv
export PATH="$(pyenv root)/shims:$PATH"
``` 

2. Trigger pyenv, and trigger virtualenvwrapper init. 
```bash
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"

pyenv virtualenvwrapper
``` 

3. Set up the environment variables for Postgres 
```bash 
alias pg_start="launchctl load ~/Library/LaunchAgents"
alias pg_stop="launchctl unload ~/Library/LaunchAgents"
export PGDATA="/usr/local/var/postgres/"
```

4. Set up the environment variables for virtualenvwrapper. `$WORKON_HOME` is used to indicate where 
   the virtualenvs live. You may need to `mkdir ~/Envs`. 
```bash 
# VirtualEnvWrapper setup
export WORKON_HOME=~/Envs
export VIRTUALENVWRAPPER_PYTHON=/Users/mb/.pyenv/shims/python3.9
```

5. If you had to install the Gnu-scientific-library (GSL), setup the library path and the following environment variables. 
```bash
export LIBRARY_PATH=/usr/local/Cellar/gsl/2.7/lib/

export LDFLAGS="-L/usr/local/opt/openssl/lib"
export CPPFLAGS="-I/usr/local/opt/openssl/include"
```

## OS Inspecific configuration 

Once you have everything above running properly, you will want the follow files to exist on your system. 

1. At `$VIRTUALENVWRAPPER_HOOK_DIR/postactivate` you will want the following script to exist:

```bash
#!/bin/bash
# This hook is sourced after every virtualenv is activated.
proj_name=$(echo $VIRTUAL_ENV|awk -F'/' '{print $NF}')
cd ~/dev/$proj_name
export DJANGO_SETTINGS_MODULE="$proj_name.$proj_name.settings.local"
export PROJECT_NAME="$proj_name"
# source ~/dev/$proj_name/.env
```

A key point is at the `cd` command, you will need to change this to match your system and where you have your projects. 
In this example, the template exists in `~/dev/generic-django-conf` and the sample project exists at `~/dev/sampleapp`. 

2. For the sake of cleaning up after ourselves, you will also want this script located at `$VIRTUALENVWRAPPER_HOOK_DIR/postdeactivate`

```bash
#!/bin/zsh
# This hook is sourced after every virtualenv is deactivated.
unset DJANGO_SETTINGS_MODULE
unset PROJECT_NAME
```

The point of these scripts is to setup the `DJANGO_SETTINGS_MODULE` environment variable. Without it, your project will not work. 

## Before you create any projects with this template
* Ensure that your git is properly setup with your username and email in order for the initial commit to have the correct log.
* Project names must be composed of lowercase alphanumeric characters only, with no spaces or special characters.

## Recommended reading
* This app is set up to work with virtualenvwrapper to make use of functionality like `workon <project_name>` 
  to silo your build environment. Read about virtualenvwrapper <https://virtualenvwrapper.readthedocs.io/en/latest/>

# Setting up a new project

There are two main scripts that you need to know about in this template, `create_new_project.sh` and `setup_existing_project.sh`.
These both do pretty much what they say, however here is an expanded list of what each will do when run:

* Create a virtual environment
* Pip install requirements (dev and regular)
* Yarn install requirements
* Create a database
* Run the django migrations
* Setup git

You should now follow the below guide depending on whether you are setting up a new project entirely, or getting spun up on a new one.

## If you are setting up a new project

Run the below commands in order: 

1. Clone the template

```
$ git clone https://github.com/Lightmatter/generic-django-conf
```

2. Use cookiecutter to create a new version of the project. It will ask you some questions about which integrations you might want.

```
$ python3.8 -m cookiecutter generic-django-conf
```

3. Navigate into the project directory that you just created

```
$ cd <project_name>
```

4. Grant execution permissions to the `create_new_project` script.

```
$ chmod +x scripts/create_new_project.sh
```

5. Execute the `create_new_project` script so that the initial setup can run (review scripts in the /scripts folder)

```
$ scripts/create_new_project.sh 
```

6. Execute the workon command with the name of the project to use the virtual environment. If this command does not work, you do not
   have virtualenvwrapper setup properly and you should consult the documentation.

```
$ workon <project_name>
```

7. Run Django server with runserver_plus 

```
$ python <project_name>/manage.py runserver_plus
```

## If you are settiing up a project that someone else created

1. Grant permissions to the `setup_existing_project.sh`

```
$ chmod +x scripts/setup_existing_project.sh
```

2. Execute the `setup_existing_project` script

```
$ scripts/setup_existing_project.sh 
```

3. Execute the workon command with the name of the project to use the virtual environment. If this command does not work, you do not
   have virtualenvwrapper setup properly and you should consult the documentation.

```
$ workon <project_name>
```

4. Run Django server with runserver_plus 

```
$ python <project_name>/manage.py runserver_plus
```


# Testing the Template

To ensure that your template is working, you can run the `test.sh` script. 
The `test.sh` will do a run of the template, and then run the django tests
and [prospector](https://pypi.org/project/prospector/) against it.

```
$ test.sh keepenv
```

*Note If you do not pass the argument keepenv, it will delete the old virtualenvironment. If you want to do this, simply run*

```
$ test.sh 
```


# Installing

The `setup_existing_project.sh` and the `create_new_project.sh` scripts will automatically install both the JavaScript and
the Python dependencies, however if you need to install them yourself manually at a later date, you can run the below commands
independently to do that.

## Install JavaScript dependencies 

```
$ yarn install
```

## Install Python Dependencies 

```
$ pip install -r requirements-dev.txt
```

# Configuring environment variables 

Before you may develop on the app itself you will need a `.env` file. Provided in the template is a `.env.example` which can 
be copy and pasted into a new .env file. It is worth noting that when a new project is created via `create_new_project.sh`, the 
`.env.example` will be copied to new instance under `.env`. This template leverages this file using the dotenv JavaScript library, 


# Building
This app uses webpack to compile/transpile assets. The app is equipped to be served from `localhost:8000` 
and webpack-dev-server will use browersync on `localhost:3100`

First the python server must be running locally.

    ./manage.py runserver_plus

To run the webpack-dev-server locally:

    npm run dev

Debugging
============
Run

    .manage.py shell_plus

Deployment
==========

This app is set up to use circleci, but could be extended to any build process. Circle will automatically run

    bandit -r $PROJECT/ -l --ini .bandit
    prospector $PROJECT -X -I "<PROJECT_NAME>/settings/*"
    coverage run --source='.' manage.py test
    isort --recursive --check-only --builtin django --skip-glob "00*.py" $PROJET/

You can read the docs for these tools here:
<https://bandit.readthedocs.io/en/latest/>
<https://github.com/PyCQA/prospector>

Note: if you hit isort errors, this can be easily fixed by running:

    isort --recursive --builtin django --skip-glob "00*.py" $PROJECT/

Projects created using this template are able to be deployed on Heroku.

Create a heroku application on Heroku and push the code there.
This can be done automatically by running

    cd terraform/environments
    terraform init
    terraform apply

You can also do this manually. You will need to set:

- The DJANGO_SETTINGS_MODULE variable to either "{{cookiecutter.project_name}}.settings.heroku" or heroku_staging
- The aws settings in AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME, AWS_ACCESS_KEY_ID
- and finally the SECRET_ACCESS_KEY which can be generated via
```python
-c 'import random; print "".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)])'
```

Make sure to add psql backup

    $ heroku addons:add pgbackups

Updating packages before a clone
================================================
I have found the tools pipupgrade and pip-review to be very useful for upgrading
https://github.com/achillesrasquinha/pipupgrade

```
pipupgrade --requirements requirements.txt 
pipupgrade --requirements requirements-dev.txt
```
should give you a starting place to upgrade packages.

WORKFLOW to write back to template
====
Create an instance of the template using the test.sh script. Create changes in the sample app, commit to git and run the script create_patch. This will attempt to take the git diff of the prior commit and apply it back to the template. It's not always perfect so you might have to do a comparison to the rej files that were unable to cleanly apply.


Running commands via Heroku CLI
====
Need to use Python version 3.8 explicitly
```
heroku run python3.8 manage.py ...
```

Todo
====
Things we still want to do
```
  caching everything possible (middleware for sure)
  Setting up heroku optimg/jpgopti and combining with thumbnail
  404/403 ect
  500 page
  user useradmin
  django-secure
  django robots
  user feedback
  add django password validators
  Front end updates
    * social media headers
    * SEO compitbility scrub
    * Accessibility compatibility scrub
```


