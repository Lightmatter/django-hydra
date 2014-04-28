=====================
LightMatter Django Template
=====================

A generic template for Django 1.6

Instructions
=====================
Follow the steps below to start a new project using this django template::

    $ django-admin.py startproject --template=https://github.com/Lightmatter/generic-django-conf/archive/master.zip  --extension=py,rb,sh,project_name --name=Procfile <project_name>
    $ cd <project_name>
    $ chmod +x start.sh
    $ ./start.sh
    $ workon <project_name>
    $ python <project_name>/manage.py runserver

Deployment
=====================
This is ment to be deployed on the heroku

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



Todo
=====================
Things we still want to do::

  404/403 ect
  500 page
  update templates_loader conf setting for prod to use cached templates rather than reload
  add in s3 settings
  create shell script to set envrionment variables
  user useradmin
  setup emberjs
     -ember tools
     -setup api for user
     -wire in user
  put all third party css files into vendor
  click jacking
  django-secure
  django-configurations
  avatars by default
  setup django crispy and floppy
  django-htmlmin
  django-filer





TRANSFERRING DATA
================

make sure the pgbackups script is installed on staging and prod

LOCAL TO REMOTE

Back up your local data via
```pg_dump -Fc --no-acl --no-owner <DBNAME> > database.dump```
put the dump in a world readable location - dropbox works, or s3
use
```heroku pgbackups:restore DATABASE_URL '<url to your dump file>'```
make sure to use the url to the raw file and not an html document talking about the file (eg dropbox, right click on save file and click copy file url)

REMOTE TO LOCAL

Create a database dump with
```$ heroku pgbackups:capture```
Download it locally with
```$ curl -o latest.dump `heroku pgbackups:url````
and load into your local db with

```$ pg_restore --verbose --clean -U <DB_USER_NAME> -W  --no-acl --no-owner -d <DB_NAME> latest.dump```


REMOTE TO REMOTE (staging to prod, or prod to staging)

Create a database dump with
```$ heroku pgbackups:capture```

and load remotely with
```heroku pgbackups:restore DATABASE_URL `heroku pgbackups:url````
