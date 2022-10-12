Prerequisites & Dependencies
==============

Before you create any projects with this template
--------------------------------------------------

* Ensure that your git is properly setup with your username and email in order for the initial commit to have the correct log.
* Project names must be composed of lowercase alphanumeric characters only, with no spaces or special characters.


Setting up for Installation
-------------
.. note::
   For Mac systems, there is an automatic installation script that handle dependencies for Hydra. Run the following commands to install via the script:

    .. code-block:: console

        git clone git@github.com:Lightmatter/generic-django-conf.git
        ./generic-django-conf/scripts/mac_intel_install.sh

<<<<<<< HEAD
It's recommended that you read the output of this script to ensure everything went smoothly,
particularly if you are using Apple silicone (M1-based-mac).
=======
    It's recommended that you read the output of this script to ensure everything went smoothly,
    particularly if you are using Apple silicone (M1-based-mac).
>>>>>>> e88d6c7 (small edits)


The following items are required in order for this template to work:


* `node <https://nodejs.org/en/download/>`_:
   * `npm <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>`_

* `python3 <https://www.python.org/downloads/>`_,
    * `pyenv <https://github.com/pyenv/pyenv>`_ is recommended to manage versions:
    * `cookiecutter <https://cookiecutter.readthedocs.io/en/1.7.2/installation.html>`_

* `postgres <https://www.postgresql.org/download/>`_

*  bash (`WSL2 <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_ or `Cygwin <https://cygwin.com/install.html>`_ recommended for windows users)
* `poetry <https://python-poetry.org/docs/>`_ virtual environment/package manager (python 3.10+ is required)
* `direnv <https://direnv.net/docs/installation.html>`_ handles activating your virtual env when you enter the project directory

.. _dependency-list:
Project Dependencies
--------------------

Hydra

* Python
* `Django <https://github.com/django/django/>`_: Django
* `whitenoise <https://github.com/evansd/whitenoise>`_: Static file servering for python web apps
* `django-allauth <https://github.com/pennersr/django-allauth>`_: Set of Django applications to address account management and authentication, including 3rd party auth
* `django-htmx <https://github.com/adamchainz/django-htmx>`_: Convenience methods for using HTMX with django, including CSRF token handling and partial rendering
* `django-annoying <https://github.com/skorokithakis/django-annoying>`_: Fixes for the annoying little things about Django
* `django-environ <https://github.com/joke2k/django-environ>`_: Allows for the configuration of a Django application using environment variables
* `django-extensions <https://github.com/django-extensions/django-extensions>`_: Extremely useful command extensions for debugging and development
* `django-model-utils <https://github.com/jazzband/django-model-utils>`_: Additional Django model mixins and utilities
* `psycopg2-binary <https://github.com/psycopg/psycopg2>`_: PostgreSQL database adapter for python
* `boto3 <https://github.com/boto/boto3>`_: AWS software development kit for python, allowing for use of S3 and EC2 technologies
* `django-storages <https://github.com/jschneier/django-storages>`_: A collection of custom storage backends for Django (Digitial Ocean, Dropbox, etc)
* `uvicorn <https://github.com/encode/uvicorn>`_: ASGI web server implementation for python
* `gunicorn <https://github.com/benoitc/gunicorn>`_: Lightweight Python WSGI HTTP server for UNIX
* `sentry-sdk <https://github.com/getsentry/sentry-python>`_: Sentry integration for Django for automatic error/exception reporting
* `Pillow <https://github.com/python-pillow/Pillow>`_: Library for adding image processing capabilities to the Python interpreter
* `django-anymail <https://github.com/anymail/django-anymail>`_: Extension for Django's core mailing feature that allows sending and receiving from several popular email service providers
* `django-vite <https://github.com/MrBin99/django-vite>`_:
* `tblib <https://github.com/ionelmc/python-tblib>`_: Serialization library for Exceptions and Tracebacks
* `django-cachalot <https://github.com/noripyt/django-cachalot>`_: Cache management for Django ORM queries
* `redis <https://github.com/redis/redis>`_:
* `hiredis <https://github.com/redis/hiredis>`_:
* `django-redis <https://github.com/jazzband/django-redis>`_: Redis cache backend for Django that provides convenience methods for managing redis
* `django-jinja <https://github.com/niwinz/django-jinja>`_: Jinja2 integration for Django
* `heroicons <https://github.com/tailwindlabs/heroicons>`_: SVG icons library
* `django-rich <https://github.com/adamchainz/django-rich>`_: Rich is a library for producing vibrant command line applications, Django-Rich is the connecting extension


Dev Dependencies
^^^^^^^^^^^^^^^^

* `Werkzeug <https://github.com/pallets/werkzeug>`_: Simple WSGI server for local development, includes debugger, test client, and more
* `coverage <https://github.com/nedbat/coveragepy>`_: Utility for measuring code coverage testing
* ipython = "^7.31.1"
* ipdb = "^0.13.9"
* ptpython = "^3.0.20"
* django-debug-toolbar = "^3.2.4"
* model-bakery = "^1.4.0"
* watchdog = "2.1.6"
* honcho = "1.1.0"
* unittest-xml-reporting = "^3.2.0"
* playwright = "^1.18.2"
* pywatchman = "^1.4.1"
* icecream = "^2.1.1"
* pre-commit = "^2.17.0"
* pudb = "^2022.1"
* poetryup = "^0.5.1"
* importmagic = "^0.1.7"
* epc = "^0.0.5"
* django-silk = "^5.0.1"
