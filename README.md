***************************
LightMatter Django Template
***************************

About
=====

A generic template for Django 3 that can be easily extended for various needs including, but not limited to, using Wagtail as a CMS, incorporating React for a front end, etc.


Dependencies, General
============
* cookiecutter
* npm
* webpack
* git
* bash
* python3

Prerequisites
============

You must have postgres and python ready to go on your system.

This app is set up to work with virtualenvwrapper to make use of functionality like `workon <project_name>` to silo your build environment.
Read about virtualenvwrapper <https://virtualenvwrapper.readthedocs.io/en/latest/>

To set up Heroku, you must have [Terraform](https://www.terraform.io/) installed.

Some notes:

* Before you start, make sure $WORKON_HOME is set to the directory where you prefer your virtual environments to live, normally "~/.virtualenvs"

* Project names must be composed of lowercase alphanumeric characters only, with no spaces or special characters.


Setup
============

The recommended start pattern is described below. The start.sh command will
* create a virtual environment
* pip install requirements (dev and regular)
* create a database
* run the migrations
* and setup git

```
    $ git clone https://github.com/Lightmatter/generic-django-conf
    $ python3.8 -m cookiecutter generic-django-conf
    $ cd <project_name>
    $ chmod +x scripts/start.sh
    $ scripts/start.sh
    $ workon <project_name>
    $ python <project_name>/manage.py runserver_plus
```

Testing the Template
==========
The test.sh will do a run of the template, and then run the django tests and prospector against it.

Pass an argument to the test to keep the python envrionment around - eg

    $ test.sh keepenv


Installing
============


    npm install

The start.sh command above will install all python dependencies but should you need it, the command is:

    pip install -r requirements-dev.txt

Setup
============

Before you may develop on the app itself you will need a .env file. Provided in the template is a .env.example which can be copy and pasted into a new .env file.


Building
============
This app uses webpack to compile/transpile assets. The app is equipped to be served from `localhost:8000` and webpack-dev-server will use browersync on `localhost:3100`

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


