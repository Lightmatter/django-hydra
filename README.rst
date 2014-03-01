=====================
LightMatter Django Template
=====================

A generic template for Django 1.5

Instructions
=====================
Follow the four steps below to start a new project using this django template::

    $ django-admin.py startproject --template=https://github.com/Lightmatter/generic-django-conf/archive/master.zip  --extension=py,rb,sh,project_name,Procfile <project_name>
    $ cd <project_name>
    $ chmod +x start.sh
    $ ./start.sh
    $ workon project_name
    $ python project_name/manage.py runserver

Todo
=====================
Things we still want to do::

  404/403 ect
  500 page
  update templates_loader conf setting for prod to use cached templates rather than reload
  setup django csrf for ajax requests in javascript
  setup secret key for prod  (os.envrion)
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
