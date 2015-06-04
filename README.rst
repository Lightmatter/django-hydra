
***************************
LightMatter Django Template
***************************

ABOUT
=====

A generic template for Django 1.8.1


Instructions
============
Follow the steps below to start a new project using this django template::

    $ django-admin.py startproject --template=https://github.com/Lightmatter/generic-django-conf/archive/master.zip  --extension=py,rb,sh,yml,project_name --name=Procfile <project_name>
    $ cd <project_name>
    $ chmod +x start.sh
    $ ./start.sh
    $ workon <project_name>
    $ python <project_name>/manage.py runserver

Deployment
==========
Projects created using this template are meant to be deployed on heroku

Create a heroku application and push the code there. You will need to set:

- The DJANGO_SETTINGS_MODULE variable to either "{{project_name}}.settings.heroku" or heroku_staging
- The aws settings in AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME, AWS_ACCESS_KEY_ID
- and finally the SECRET_ACCESS_KEY which can be generated via ```python -c 'import random; print "".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)])'```

You can set the variables using the heroku command, the config:set argument and the --app flag:
```heroku config:set DJANGO_SETTINGS_MODULE={{project_name}}.settings.heroku-staging```
or
```heroku config:set SECRET_KEY=`python -c 'import random; print "".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)])'````

Use the Mandrill addon to setup email -
```$ heroku addons:add mandrill:starter```

Make sure to add psql backup
```$ heroku addons:add pgbackups```

Add in the newrelic addon:
```$ heroku addons:add newrelic```

After pushing the code, you'll need to syncdb and run the initial migrations:
```$ heroku run python manage.py syncdb --migrate```


Release notes
=============

Version 0.1.4 (2015-07-7)
--------------------------

* switching to python 3
* Upgraded version of django to 1.8.2
* added casper.js powered acceptance testing
* added qunit powered javascript unit testing
* adding script to automatically create heroku hosts
* using custom user model
* adding script to test template


Version 0.1.3 (2014-07-7)
--------------------------

* bug fixes and updates to readme
* swiched to waitress


Version 0.1.2 (2014-07-7)
--------------------------

* Adding in Easy-thumbnails
* Restructing heroku settings in a better format
* Adding in redis for caching

Version 0.1.1 (2014-07-7)
--------------------------

* Adding in django smuggler
* Adding in error message for manage.py to check to ensure your django settings env variable is set


Version 0.1 (2014-07-7)
--------------------------

* First Numbered release


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
