Compiling and Deployment
===========

Automatic Actions
-----------------

This will be run automatically when you attempt to commit code but if you want to manually validate/fix your code syntax during development you can run:

.. code-block:: console

    poetry run pre-commit run --all-files

This app is set up to use circleci, but could be extended to any build process. Circle will automatically run:

.. code-block:: console

    poetry run pre-commit run --all-files
    poetry run playwright install
    poetry run coverage run --source='.' -m pytest


Compiling Process
-----------------

Vite and Entry Points
*********************

- vite.config.js: ENTRYPOINTS: every js file that can be imported into html files (currently main.ts)

CSS and TypeScript
******************
- import CSS through JS file and then put in through Vite entrypoint

Static Location and Manifest
****************************
- Npm build exports manifest.json file w/ entrypoints and dependencies

- run collect static (django functionality to move files where they need to go)

Whitenoise and Caching
**********************

Whitenoise is used to serve static files over Django's handling of static assets, and used for HTTP caching

As discussed in the `django_vite <https://github.com/MrBin99/django-vite/blob/master/README.md#notes>`_ documentation,
There is a custom test that is required to amend Vite's behavior to accomodate whitenoise serving static assets.
For more details about the implementation, see `this guide <http://whitenoise.evans.io/en/stable/django.html#WHITENOISE_IMMUTABLE_FILE_TEST>`_.


Deployment Process and Optimizations
-------------

There are configuration files for `render.com <https://render.com/>`_ and `fly.io <https://fly.io/>`_.

The render file sets up the following services:
* a Django webserver with a prebuilt/precompiled front end
* a Minio service that manages media asset storage on AWS S3
* a redis service
* a PostgreSQL database


Built-In CDN
************
https://fly.io/docs/reference/configuration/#the-statics-sections

Redis
*****


Cachealot
*********
