
***************************
LightMatter Django Template
***************************

ABOUT
=====

A generic template for Django 1.11x

Prerequisites
=============
This template tries to be faithful to the 12 factor app configuration. Lots of functionality is driven by env variables.
To clone the template you must have defined
 - PROJECT_HOME - the folder where all your projects live


Instructions
============
Follow the steps below to start a new project using this django template::

    $ git clone https://github.com/Lightmatter/generic-django-conf
    $ cookiecutter generic-django-conf
    $ cd <project_name>
    $ chmod +x scripts/start.sh
    $ scripts/start.sh
    $ workon <project_name>
    $ python <project_name>/manage.py runserver

Deployment
==========
Projects created using this template are meant to be deployed on heroku

Create a heroku application and push the code there. You will need to set:

- The DJANGO_SETTINGS_MODULE variable to either "{{cookiecutter.project_name}}.settings.heroku" or heroku_staging
- The aws settings in AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME, AWS_ACCESS_KEY_ID
- and finally the SECRET_ACCESS_KEY which can be generated via ```python -c 'import random; print "".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)])'```

Make sure to add psql backup
```$ heroku addons:add pgbackups```


DEBUGGING




Todo
====
Things we still want to do::

  caching everything possible (middleware for sure)
  Setting up heroku optimg/jpgopti and combining with thumbnail
  404/403 ect
  500 page
  user useradmin
  click jacking
  django-secure
  avatars by default
  setup django crispy and floppy
  django-htmlmin
  wagtail by default
django robots
update all packages
Heroku dyno meta data to setup s
add in sentry features to template
 - put sentry into template
 - user feedback
 -  Auto generate sentry project via api end point
create precommit hook for prospector and isort
auto generate precommit hook

Add to webpack conf admin/main config
fix react at conf
 - installed packages/postinsall and test
 - eslint
 - post install
 - test


heroku app.json
